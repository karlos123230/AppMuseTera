export interface AvaliacaoParametro {
  id: string
  nome: string
  multiplicador?: number
}

export interface AvaliacaoCategoria {
  id: string
  nome: string
  habilidades: AvaliacaoParametro[]
}

export const ESCALA_DEMUCA: AvaliacaoCategoria[] = [
  {
    id: 'musicalidade',
    nome: 'Musicalidade',
    habilidades: [
      { id: 'percepcao_ritmica', nome: 'Percepção Rítmica' },
      { id: 'percepcao_melodica', nome: 'Percepção Melódica' },
      { id: 'percepcao_harmonica', nome: 'Percepção Harmônica' },
      { id: 'expressao_musical', nome: 'Expressão Musical', multiplicador: 2 }
    ]
  },
  {
    id: 'comunicacao',
    nome: 'Comunicação',
    habilidades: [
      { id: 'comunicacao_verbal', nome: 'Comunicação Verbal' },
      { id: 'comunicacao_nao_verbal', nome: 'Comunicação Não-Verbal' },
      { id: 'interacao_social', nome: 'Interação Social', multiplicador: 2 },
      { id: 'expressao_emocional', nome: 'Expressão Emocional' }
    ]
  },
  {
    id: 'cognicao',
    nome: 'Cognição',
    habilidades: [
      { id: 'atencao', nome: 'Atenção' },
      { id: 'memoria', nome: 'Memória' },
      { id: 'organizacao_pensamento', nome: 'Organização do Pensamento' },
      { id: 'criatividade', nome: 'Criatividade', multiplicador: 2 }
    ]
  },
  {
    id: 'comportamento',
    nome: 'Comportamento',
    habilidades: [
      { id: 'participacao', nome: 'Participação' },
      { id: 'iniciativa', nome: 'Iniciativa' },
      { id: 'adaptacao', nome: 'Adaptação' },
      { id: 'autocontrole', nome: 'Autocontrole', multiplicador: 2 }
    ]
  },
  {
    id: 'motricidade',
    nome: 'Motricidade',
    habilidades: [
      { id: 'coordenacao_motora', nome: 'Coordenação Motora' },
      { id: 'lateralidade', nome: 'Lateralidade' },
      { id: 'esquema_corporal', nome: 'Esquema Corporal' },
      { id: 'controle_motor', nome: 'Controle Motor', multiplicador: 2 }
    ]
  }
]

export interface AvaliacaoFormData {
  id?: string
  patientId: string
  respostas: Record<string, string>
  observacoes?: string
  createdAt?: Date
  updatedAt?: Date
}
