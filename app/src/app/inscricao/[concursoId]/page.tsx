// app/inscricao/[concursoId]/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PublicHeader } from '../../../components/PublicHeader';
import { PublicFooter } from '../../../components/PublicFooter';
import { useCadastrarConcorrente } from '../../../hooks/concorrente/useCadastrarConcorrente';
import { useConcursosPublicos } from '../../../hooks/concurso/useConcursosPublicos';
import { uploadToSupabase, validateImageFile } from '@/utils/supabase/uploadService';
import { COLORS } from '@/constants/colors';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InscricaoPage() {
  const params = useParams();
  const router = useRouter();
  const concursoId = Number(params.concursoId);
  
  const { concursos, isLoading: isLoadingConcursos } = useConcursosPublicos();
  const { cadastrar, isLoading, error, clearError } = useCadastrarConcorrente();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [inscricaoSucesso, setInscricaoSucesso] = useState<any>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    fotoPerfil: '',
    telefone: '',
    endereco: '',
    concursoId: concursoId
  });

  // Buscar informações do concurso
  const concurso = concursos.find(c => c.id === concursoId);

  useEffect(() => {
    if (concurso && concurso.estado !== 'ABERTO') {
      router.push('/concursos-publicos');
    }
  }, [concurso, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (error) clearError();
    if (uploadError) setUploadError(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar arquivo
    const validation = validateImageFile(file);
    if (!validation.valid) {
  setUploadError(validation.message ?? null);

      return;
    }

    setUploadingPhoto(true);
    setUploadError(null);

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Fazer upload
    const result = await uploadToSupabase(file);
    
    if (result.error) {
      setUploadError(`Erro no upload: ${result.error}`);
      setPreviewUrl(null);
    } else if (result.publicUrl) {
      setFormData(prev => ({ ...prev, fotoPerfil: result.publicUrl! }));
    }

    setUploadingPhoto(false);
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, fotoPerfil: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (formData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    if (!formData.nome.trim()) {
      alert('Por favor, preencha seu nome completo');
      return;
    }

    if (!formData.email.trim()) {
      alert('Por favor, preencha seu email');
      return;
    }

    // Remover confirmação de senha dos dados enviados
    const { confirmPassword, ...dadosParaEnviar } = formData;

    try {
      const resultado = await cadastrar(dadosParaEnviar);
      
      if (resultado) {
        setInscricaoSucesso(resultado);
        setShowSuccessModal(true);
        
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          password: '',
          confirmPassword: '',
          fotoPerfil: '',
          telefone: '',
          endereco: '',
          concursoId: concursoId
        });
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Erro na inscrição:', error);
    }
  };

  if (isLoadingConcursos) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: COLORS.primary, width: '3rem', height: '3rem' }}></div>
      </div>
    );
  }

  if (!concurso) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <PublicHeader showBackButton title="Concurso não encontrado" />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <i className="bi bi-exclamation-triangle display-1 mb-3" style={{ color: COLORS.error }}></i>
            <h2 className="h3 mb-3" style={{ color: COLORS.textPrimaryLight }}>Concurso não encontrado</h2>
            <p className="text-muted mb-4">O concurso que você está tentando acessar não existe ou foi removido.</p>
            <button 
              className="btn"
              onClick={() => router.push('/concursos-publicos')}
              style={{ 
                background: COLORS.gradientPrimary,
                color: 'white',
                border: 'none',
                fontWeight: '600',
                padding: '0.75rem 1.5rem'
              }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar para Concursos
            </button>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <PublicHeader showBackButton title={`Inscrever-se: ${concurso.nome}`} />

      {/* Conteúdo Principal */}
      <main className="flex-grow-1 py-5" style={{ backgroundColor: COLORS.backgroundLight }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {/* Informações do Concurso */}
              <div 
                className="card border-0 shadow-sm mb-5"
                style={{ 
                  borderLeft: `4px solid ${COLORS.primary}`,
                  backgroundColor: 'white'
                }}
              >
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h3 className="h4 fw-bold mb-2" style={{ color: COLORS.primary }}>
                        {concurso.nome}
                      </h3>
                      <p className="text-muted mb-2">
                        <i className="bi bi-building me-2"></i>
                        Organizado por: <strong>{concurso.nomeEntidade}</strong>
                      </p>
                      <p className="text-muted mb-0">
                        <i className="bi bi-tag me-2"></i>
                        Tipo: <span className="badge bg-primary">{concurso.tipoConcurso}</span>
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <div className="d-inline-block px-3 py-2 rounded" style={{ backgroundColor: `${COLORS.success}15` }}>
                        <span className="fw-semibold" style={{ color: COLORS.success }}>
                          <i className="bi bi-check-circle me-1"></i>
                          Inscrições Abertas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário de Inscrição */}
              <div className="row">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 p-md-5">
                      <h4 className="h5 fw-bold mb-4" style={{ color: COLORS.textPrimaryLight }}>
                        <i className="bi bi-person-plus me-2"></i>
                        Formulário de Inscrição
                      </h4>

                      {error && (
                        <div 
                          className="alert alert-danger mb-4"
                          role="alert"
                          style={{ 
                            backgroundColor: `${COLORS.error}15`,
                            borderColor: COLORS.error,
                            color: COLORS.error
                          }}
                        >
                          <i className="bi bi-exclamation-triangle-fill me-2"></i>
                          <strong>Erro:</strong> {error.message}
                          {error.field && (
                            <div className="mt-1 small">Campo: {error.field}</div>
                          )}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        {/* Nome e Email */}
                        <div className="row mb-4">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="nome" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Nome Completo *
                            </label>
                            <input
                              type="text"
                              id="nome"
                              name="nome"
                              className="form-control"
                              placeholder="Seu nome completo"
                              value={formData.nome}
                              onChange={handleChange}
                              required
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="seu.email@exemplo.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                        </div>

                        {/* Telefone e Endereço */}
                        <div className="row mb-4">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="telefone" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Telefone
                            </label>
                            <input
                              type="tel"
                              id="telefone"
                              name="telefone"
                              className="form-control"
                              placeholder="+258 84 300 0000"
                              value={formData.telefone}
                              onChange={handleChange}
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="endereco" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Endereço
                            </label>
                            <input
                              type="text"
                              id="endereco"
                              name="endereco"
                              className="form-control"
                              placeholder="Cidade, Bairro, País"
                              value={formData.endereco}
                              onChange={handleChange}
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                        </div>

                        {/* Foto de Perfil */}
                        <div className="mb-4">
                          <label className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                            Foto de Perfil
                          </label>
                          
                          <div className="d-flex align-items-start gap-3">
                            {/* Preview da foto */}
                            {previewUrl ? (
                              <div className="position-relative">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="rounded-circle border"
                                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <button
                                  type="button"
                                  onClick={handleRemovePhoto}
                                  className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                                  style={{ width: '24px', height: '24px', padding: 0 }}
                                  disabled={uploadingPhoto || isLoading}
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </div>
                            ) : (
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center border"
                                style={{ 
                                  width: '100px', 
                                  height: '100px',
                                  backgroundColor: COLORS.backgroundLight,
                                  borderColor: COLORS.borderLight,
                                  color: COLORS.textMutedLight
                                }}
                              >
                                <i className="bi bi-person fs-1"></i>
                              </div>
                            )}

                            <div className="flex-grow-1">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="form-control"
                                disabled={uploadingPhoto || isLoading}
                                style={{ display: 'none' }}
                              />
                              
                              <div className="d-flex flex-column gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="btn btn-outline-primary"
                                  disabled={uploadingPhoto || isLoading}
                                >
                                  {uploadingPhoto ? (
                                    <>
                                      <span className="spinner-border spinner-border-sm me-2"></span>
                                      Carregando...
                                    </>
                                  ) : (
                                    <>
                                      <i className="bi bi-upload me-2"></i>
                                      Escolher Foto
                                    </>
                                  )}
                                </button>
                                
                                <small className="text-muted">
                                  Formatos: JPG, PNG (máx. 5MB)
                                </small>
                              </div>
                              
                              {uploadError && (
                                <div className="text-danger small mt-1">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {uploadError}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Senhas */}
                        <div className="row mb-4">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label htmlFor="password" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Senha *
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder="Mínimo 6 caracteres"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                          
                          <div className="col-md-6">
                            <label htmlFor="confirmPassword" className="form-label fw-semibold" style={{ color: COLORS.textPrimaryLight }}>
                              Confirmar Senha *
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              className="form-control"
                              placeholder="Digite novamente"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              disabled={isLoading}
                              style={{ 
                                borderColor: COLORS.borderLight,
                                color: COLORS.textPrimaryLight
                              }}
                            />
                          </div>
                        </div>

                        {/* Termos e Condições */}
                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="termos"
                            required
                            disabled={isLoading}
                            style={{ 
                              borderColor: COLORS.primary
                            }}
                          />
                          <label className="form-check-label text-muted small" htmlFor="termos">
                            Concordo com os{' '}
                            <a href="#" className="text-decoration-none" style={{ color: COLORS.primary }}>
                              Termos de Uso
                            </a>{' '}
                            e{' '}
                            <a href="#" className="text-decoration-none" style={{ color: COLORS.primary }}>
                              Política de Privacidade
                            </a>
                          </label>
                        </div>

                        {/* Botão de Envio */}
                        <button
                          type="submit"
                          className="btn w-100"
                          disabled={isLoading || uploadingPhoto}
                          style={{ 
                            background: COLORS.gradientPrimary,
                            color: 'white',
                            border: 'none',
                            fontWeight: '600',
                            padding: '0.75rem',
                            fontSize: '1.1rem'
                          }}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Processando Inscrição...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send-check me-2"></i>
                              Finalizar Inscrição
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Sidebar com informações */}
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                    <div className="card-body p-4">
                      <h5 className="h6 fw-bold mb-3" style={{ color: COLORS.primary }}>
                        <i className="bi bi-info-circle me-2"></i>
                        Informações Importantes
                      </h5>
                      
                      <div className="mb-4">
                        <div className="d-flex align-items-start mb-3">
                          <i className="bi bi-shield-check me-2" style={{ color: COLORS.success, marginTop: '2px' }}></i>
                          <div>
                            <h6 className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>Segurança</h6>
                            <p className="text-muted small mb-0">Seus dados estão protegidos com criptografia.</p>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-start mb-3">
                          <i className="bi bi-clock-history me-2" style={{ color: COLORS.warning, marginTop: '2px' }}></i>
                         
                        </div>
                        
                        <div className="d-flex align-items-start mb-3">
                          <i className="bi bi-chat-dots me-2" style={{ color: COLORS.info, marginTop: '2px' }}></i>
                          <div>
                            <h6 className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>Suporte</h6>
                            <p className="text-muted small mb-0">Dúvidas? Entre em contacto com o organizador.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="alert alert-info" style={{ 
                        backgroundColor: `${COLORS.info}10`,
                        borderColor: COLORS.infoLight,
                        color: COLORS.textPrimaryLight,
                        fontSize: '0.9rem'
                      }}>
                        <h6 className="alert-heading mb-2">
                          <i className="bi bi-lightbulb me-2"></i>
                          Dica
                        </h6>
                        <p className="mb-0">
                          Após a inscrição, você  poderá acompanhar seu status através do login.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />

      {/* Modal de Sucesso */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="p-4 text-center">
          <div className="mb-4">
            <div 
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ 
                width: '80px', 
                height: '80px', 
                background: COLORS.gradientPrimary,
                color: 'white',
                fontSize: '2rem'
              }}
            >
              <i className="bi bi-check-lg"></i>
            </div>
            
            <h4 className="fw-bold mb-3" style={{ color: COLORS.primary }}>
              Inscrição Realizada com Sucesso!
            </h4>
            
            <p className="text-muted mb-4">
              Parabéns <strong>{inscricaoSucesso?.nome}</strong>! Sua inscrição no concurso 
              <strong> "{concurso.nome}"</strong> foi realizada com sucesso.
            </p>
            
            <div 
              className="alert alert-info text-start mb-4"
              style={{ 
                backgroundColor: `${COLORS.info}10`,
                borderColor: COLORS.infoLight
              }}
            >
              <h6 className="fw-semibold mb-2">
                <i className="bi bi-envelope me-2"></i>
                Próximos passos:
              </h6>
              <ul className="mb-0 small">
               {/* <li>Verifique seu email ({inscricaoSucesso?.email}) para confirmação</li> */}
                <li>Seu status inicial é: <strong>PENDENTE</strong></li>
                <li>Acompanhe a aprovação através do login</li>
              </ul>
            </div>
          </div>
          
          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => router.push('/auth')}
              className="btn w-100"
              style={{ 
                background: COLORS.gradientPrimary,
                color: 'white',
                border: 'none',
                fontWeight: '600',
                padding: '0.75rem'
              }}
            >
              <i className="bi bi-person-check me-2"></i>
              Acompanhar Inscrição (Login)
            </button>
            
            <button
              onClick={() => {
                setShowSuccessModal(false);
                router.push('/concursos-publicos');
              }}
              className="btn w-100"
              style={{ 
                backgroundColor: COLORS.surfaceLight,
                color: COLORS.textPrimaryLight,
                border: `1px solid ${COLORS.borderLight}`,
                fontWeight: '600',
                padding: '0.75rem'
              }}
            >
              <i className="bi bi-trophy me-2"></i>
              Ver Outros Concursos
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Estilos */}
      <style jsx global>{`
        .form-control:focus, .form-select:focus {
          border-color: ${COLORS.primary} !important;
          box-shadow: 0 0 0 0.25rem ${COLORS.primary}25 !important;
        }
        
        .sticky-top {
          position: sticky !important;
        }
      `}</style>
    </div>
  );
}