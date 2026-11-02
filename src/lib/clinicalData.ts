// Backend integration point: replace these static modules with your clinical knowledge-base API / JSON store.

export type SystemId =
  | 'head' |'chest' |'abdomen' |'limbs' |'skin' |'neuro' |'general';

export interface BodySystem {
  id: SystemId;
  label: string;
  region: string;
  symptomCount: number;
  modules: string[];
}

export const bodySystems: BodySystem[] = [
  { id: 'head', label: 'Cabeza y cuello', region: 'Cabeza / Cuello', symptomCount: 38, modules: ['Respiratorio / Infeccioso', 'Neurológico'] },
  { id: 'chest', label: 'Tórax', region: 'Cardiorrespiratorio', symptomCount: 44, modules: ['Cardiovascular', 'Respiratorio / Infeccioso'] },
  { id: 'abdomen', label: 'Abdomen', region: 'Gastrointestinal', symptomCount: 41, modules: ['Gastrointestinal', 'Genitourinario'] },
  { id: 'limbs', label: 'Extremidades', region: 'Musculoesquelético', symptomCount: 47, modules: ['Musculoesquelético'] },
  { id: 'skin', label: 'Piel', region: 'Dermatológico', symptomCount: 29, modules: ['Dermatológico'] },
  { id: 'neuro', label: 'Neurológico', region: 'Sistema nervioso', symptomCount: 33, modules: ['Neurológico'] },
  { id: 'general', label: 'General / Infeccioso', region: 'Sistémico', symptomCount: 36, modules: ['Respiratorio / Infeccioso', 'Genitourinario'] },
];

export interface SymptomEntry {
  id: string;
  label: string;
  system: SystemId;
  hint: string;
}

export const symptomIndex: SymptomEntry[] = [
  { id: 'sym-dolor-cabeza', label: 'Dolor de cabeza', system: 'neuro', hint: 'Cefalea tensional, migraña, neuralgia' },
  { id: 'sym-fiebre', label: 'Fiebre', system: 'general', hint: 'Gripe, COVID-19, infección urinaria' },
  { id: 'sym-esguince', label: 'Esguince de tobillo', system: 'limbs', hint: 'Traumatismo, inflamación, limitación al apoyo' },
  { id: 'sym-dolor-abdominal', label: 'Dolor abdominal', system: 'abdomen', hint: 'Apendicitis, gastritis, cólico biliar' },
  { id: 'sym-dolor-pecho', label: 'Dolor en el pecho', system: 'chest', hint: 'Angina, reflujo, causa musculoesquelética' },
  { id: 'sym-tos', label: 'Tos persistente', system: 'chest', hint: 'Bronquitis, neumonía, COVID-19' },
  { id: 'sym-garganta', label: 'Dolor de garganta', system: 'head', hint: 'Amigdalitis, gripe, faringitis' },
  { id: 'sym-vertigo', label: 'Mareo o vértigo', system: 'neuro', hint: 'Vértigo paroxístico, hipotensión, arritmia' },
  { id: 'sym-lumbar', label: 'Dolor lumbar', system: 'limbs', hint: 'Hernia discal, contractura, cólico renal' },
  { id: 'sym-ardor', label: 'Ardor al orinar', system: 'abdomen', hint: 'Infección de vías urinarias, prostatitis' },
  { id: 'sym-erupcion', label: 'Erupción o ronchas', system: 'skin', hint: 'Urticaria, dermatitis, micosis' },
  { id: 'sym-nauseas', label: 'Náuseas y vómitos', system: 'abdomen', hint: 'Gastroenteritis, gastritis, migraña' },
  { id: 'sym-palpitaciones', label: 'Palpitaciones', system: 'chest', hint: 'Arritmias, ansiedad, hipertiroidismo' },
  { id: 'sym-rodilla', label: 'Dolor de rodilla', system: 'limbs', hint: 'Artrosis, tendinopatía, lesión meniscal' },
  { id: 'sym-picazon', label: 'Picazón en la piel', system: 'skin', hint: 'Dermatitis, micosis, urticaria' },
  { id: 'sym-hormigueo', label: 'Hormigueo en brazos o piernas', system: 'neuro', hint: 'Neuralgia, hernia discal, déficit vascular' },
];

export const commonComplaints: string[] = [
  'Dolor de cabeza',
  'Fiebre',
  'Dolor abdominal',
  'Dolor lumbar',
  'Tos persistente',
  'Mareo o vértigo',
  'Ardor al orinar',
  'Dolor de garganta',
];

export interface ZoneEntry {
  id: string;
  label: string;
  system: SystemId;
}

export const bodyZones: ZoneEntry[] = [
  { id: 'zone-head', label: 'Cabeza', system: 'head' },
  { id: 'zone-neck', label: 'Cuello', system: 'head' },
  { id: 'zone-chest', label: 'Tórax', system: 'chest' },
  { id: 'zone-abdomen', label: 'Abdomen', system: 'abdomen' },
  { id: 'zone-pelvis', label: 'Pelvis', system: 'abdomen' },
  { id: 'zone-arm', label: 'Brazos', system: 'limbs' },
  { id: 'zone-leg', label: 'Piernas', system: 'limbs' },
  { id: 'zone-back', label: 'Espalda', system: 'limbs' },
  { id: 'zone-skin', label: 'Piel', system: 'skin' },
];

export const redFlagList: string[] = [
  'Dolor precordial opresivo',
  'Alteración del habla o asimetría facial',
  'Dificultad respiratoria severa',
  'Hemorragia profusa',
  'Pérdida de conciencia',
];

// ---------------- Questionnaire (ALICIA) ----------------

export interface Option {
  id: string;
  label: string;
  hint?: string;
  redFlag?: boolean;
}

export const onsetOptions: Option[] = [
  { id: 'onset-minutes', label: 'Hace minutos u horas', hint: 'Inicio súbito, agudo' },
  { id: 'onset-days', label: 'Hace 1 a 3 días', hint: 'Agudo reciente' },
  { id: 'onset-week', label: 'Hace una semana o más', hint: 'Subagudo' },
  { id: 'onset-chronic', label: 'Más de un mes', hint: 'Crónico o recurrente' },
];

export const locationOptions: Option[] = [
  { id: 'loc-local', label: 'Localizado en un punto', hint: 'Zona bien delimitada' },
  { id: 'loc-diffuse', label: 'Difuso o generalizado', hint: 'Sin punto exacto' },
  { id: 'loc-radiates-arm', label: 'Se irradia al brazo, mandíbula o espalda', hint: 'Irradiación característica', redFlag: false },
  { id: 'loc-radiates-leg', label: 'Baja por la pierna', hint: 'Irradiación nerviosa' },
  { id: 'loc-migratory', label: 'Cambia de lugar', hint: 'Migratorio, p. ej. periumbilical a fosa ilíaca' },
];

export const characterOptions: Option[] = [
  { id: 'char-stab', label: 'Punzante', hint: 'Como una puñalada' },
  { id: 'char-press', label: 'Opresivo', hint: 'Como un peso o presión' },
  { id: 'char-burn', label: 'Ardor', hint: 'Quemazón' },
  { id: 'char-dull', label: 'Sordo', hint: 'Continuo y apagado' },
  { id: 'char-throb', label: 'Pulsátil', hint: 'Late con el pulso' },
  { id: 'char-colic', label: 'Cólico', hint: 'Va y viene en oleadas' },
];

export const accompanyingOptions: Option[] = [
  { id: 'acc-fever', label: 'Fiebre', hint: '>37,8 °C' },
  { id: 'acc-nausea', label: 'Náuseas o vómitos' },
  { id: 'acc-diarrhea', label: 'Diarrea' },
  { id: 'acc-cough', label: 'Tos' },
  { id: 'acc-dizzy', label: 'Mareo' },
  { id: 'acc-photophobia', label: 'Molestia a la luz' },
  { id: 'acc-urine', label: 'Ardor o urgencia al orinar' },
  { id: 'acc-swelling', label: 'Hinchazón o hematoma' },
  { id: 'acc-rash', label: 'Erupción en la piel' },
  { id: 'acc-chest', label: 'Dolor precordial opresivo', hint: 'Puede irradiar al brazo', redFlag: true },
  { id: 'acc-speech', label: 'Dificultad para hablar o cara torcida', hint: 'Asimetría facial', redFlag: true },
  { id: 'acc-breath', label: 'Falta de aire severa', hint: 'No puede completar frases', redFlag: true },
  { id: 'acc-bleed', label: 'Hemorragia que no cede', hint: 'Sangrado profuso', redFlag: true },
  { id: 'acc-faint', label: 'Pérdida de conciencia', hint: 'Desmayo o confusión', redFlag: true },
];

export const triggerOptions: Option[] = [
  { id: 'trg-effort', label: 'Esfuerzo físico' },
  { id: 'trg-food', label: 'Comidas o ayuno' },
  { id: 'trg-movement', label: 'Movimiento o postura' },
  { id: 'trg-trauma', label: 'Golpe o torcedura' },
  { id: 'trg-stress', label: 'Estrés o falta de sueño' },
  { id: 'trg-cold', label: 'Frío o contacto con alguien enfermo' },
  { id: 'trg-none', label: 'Sin desencadenante claro' },
];

export const evaFaces: { value: number; label: string }[] = [
  { value: 1, label: 'Mínimo' },
  { value: 3, label: 'Leve' },
  { value: 5, label: 'Moderado' },
  { value: 7, label: 'Intenso' },
  { value: 9, label: 'Insoportable' },
];

// ---------------- Conditions & scoring matrix ----------------

export type TriageLevel = 'green' | 'yellow' | 'red';

export interface Condition {
  id: string;
  name: string;
  module: string;
  triage: TriageLevel;
  specialty: string;
  firstAid: string[];
  rationale: string;
  // scoring matrix: option id -> weight
  weights: Record<string, number>;
  image: string;
  alt: string;
  icd10: string;
  summary: string;
  keyFindings: string[];
  warningSigns: string[];
  suggestedTests: string[];
  prognosis: string;
}

type BaseCondition = Omit<
  Condition,
  'image' | 'alt' | 'icd10' | 'summary' | 'keyFindings' | 'warningSigns' | 'suggestedTests' | 'prognosis'
>;

type ConditionDetail = Pick<
  Condition,
  'image' | 'alt' | 'icd10' | 'summary' | 'keyFindings' | 'warningSigns' | 'suggestedTests' | 'prognosis'
>;

const conditionDetails: Record<string, ConditionDetail> = {
  'cond-apendicitis': {
    image: '/assets/images/dx-apendicitis.png',
    alt: 'Render anatómico holográfico del abdomen con el apéndice inflamado resaltado en rojo en la fosa ilíaca derecha',
    icd10: 'K35.8',
    summary: 'Inflamación aguda del apéndice cecal que puede evolucionar a perforación si no se trata de forma quirúrgica.',
    keyFindings: ['Dolor periumbilical que migra a fosa ilíaca derecha', 'Náuseas y anorexia', 'Febrícula o fiebre', 'Dolor al rebote (signo de Blumberg)'],
    warningSigns: ['Dolor abdominal que se vuelve generalizado', 'Abdomen rígido', 'Fiebre alta con escalofríos', 'Vómitos persistentes'],
    suggestedTests: ['Hemograma y PCR', 'Ecografía abdominal', 'TAC abdominal si hay duda', 'Examen físico quirúrgico'],
    prognosis: 'Excelente con cirugía precoz; el riesgo de complicaciones aumenta tras 24–48 h.',
  },
  'cond-gastritis': {
    image: '/assets/images/dx-gastritis.png',
    alt: 'Render holográfico del estómago con la mucosa gástrica irritada resaltada en tono ámbar',
    icd10: 'K29.7',
    summary: 'Inflamación de la mucosa del estómago, frecuentemente asociada a Helicobacter pylori, AINEs, alcohol o estrés.',
    keyFindings: ['Ardor o dolor epigástrico', 'Empeora con comidas o ayuno', 'Náuseas y sensación de plenitud', 'Eructos y acidez'],
    warningSigns: ['Vómito con sangre', 'Heces negras (melena)', 'Pérdida de peso involuntaria', 'Dolor intenso y repentino'],
    suggestedTests: ['Test de aliento o antígeno para H. pylori', 'Endoscopia digestiva alta', 'Hemograma'],
    prognosis: 'Favorable con tratamiento y cambios de hábitos; recurrencia posible si persiste el desencadenante.',
  },
  'cond-gastroenteritis': {
    image: '/assets/images/dx-gastroenteritis.png',
    alt: 'Render holográfico del intestino con zonas de inflamación resaltadas en verde suave',
    icd10: 'A09',
    summary: 'Infección intestinal aguda, habitualmente viral o bacteriana, de curso autolimitado en la mayoría de casos.',
    keyFindings: ['Diarrea acuosa de inicio reciente', 'Náuseas y vómitos', 'Cólicos abdominales', 'Febrícula'],
    warningSigns: ['Signos de deshidratación (boca seca, orina escasa)', 'Sangre en las heces', 'Fiebre mayor a 39 °C', 'Diarrea de más de 3 días'],
    suggestedTests: ['Valoración clínica de hidratación', 'Coprocultivo si hay sangre o fiebre alta', 'Electrolitos en casos moderados'],
    prognosis: 'Resolución habitual en 2–5 días con rehidratación y dieta blanda.',
  },
  'cond-migrana': {
    image: '/assets/images/dx-migrana.png',
    alt: 'Render holográfico de cabeza y cerebro en perfil con zonas de dolor pulsátil resaltadas en naranja',
    icd10: 'G43.9',
    summary: 'Cefalea primaria recurrente, de predominio unilateral y pulsátil, con sensibilidad a luz y sonido.',
    keyFindings: ['Dolor pulsátil unilateral', 'Fotofobia y fonofobia', 'Náuseas o vómitos', 'Empeora con la actividad física'],
    warningSigns: ['Peor dolor de cabeza de tu vida', 'Déficit neurológico nuevo', 'Fiebre con rigidez de cuello', 'Inicio tras traumatismo'],
    suggestedTests: ['Valoración neurológica', 'Diario de cefaleas', 'Neuroimagen solo si hay signos de alarma'],
    prognosis: 'Crónica y recurrente, pero con muy buen control mediante tratamiento agudo y preventivo.',
  },
  'cond-cefalea': {
    image: '/assets/images/dx-cefalea.png',
    alt: 'Render holográfico de cabeza, cuello y hombros con la banda de tensión muscular resaltada en azul',
    icd10: 'G44.2',
    summary: 'La cefalea primaria más frecuente; dolor opresivo bilateral ligado a tensión muscular, estrés y postura.',
    keyFindings: ['Dolor opresivo en banda', 'Intensidad leve a moderada', 'Sin náuseas ni vómitos', 'Rigidez cervical asociada'],
    warningSigns: ['Dolor que empeora progresivamente', 'Cambios en la visión', 'Debilidad o confusión', 'Fiebre persistente'],
    suggestedTests: ['Exploración cervical y neurológica', 'Revisión de hábitos de sueño y postura'],
    prognosis: 'Muy favorable; mejora con manejo del estrés, ergonomía y analgesia puntual.',
  },
  'cond-esguince': {
    image: '/assets/images/dx-esguince.png',
    alt: 'Render holográfico estilo radiografía de tobillo y pie con ligamentos lesionados e hinchazón resaltados en naranja',
    icd10: 'S93.4',
    summary: 'Lesión de los ligamentos del tobillo por torsión brusca, clasificada en grados I a III según la rotura.',
    keyFindings: ['Torcedura con dolor inmediato', 'Hinchazón y hematoma', 'Dolor al apoyar o caminar', 'Sensibilidad sobre el ligamento'],
    warningSigns: ['Imposibilidad de dar cuatro pasos', 'Deformidad visible', 'Pérdida de sensibilidad del pie', 'Dolor óseo intenso'],
    suggestedTests: ['Criterios de Ottawa', 'Radiografía de tobillo si son positivos', 'Ecografía de ligamentos'],
    prognosis: 'Recuperación en 2–6 semanas según el grado, con fisioterapia y propiocepción.',
  },
  'cond-hernia': {
    image: '/assets/images/dx-hernia-discal.png',
    alt: 'Render holográfico estilo rayos X de columna lumbar con un disco herniado comprimiendo la raíz nerviosa en ámbar',
    icd10: 'M51.2',
    summary: 'Desplazamiento del núcleo del disco intervertebral que comprime una raíz nerviosa y causa ciática.',
    keyFindings: ['Dolor lumbar que baja por la pierna', 'Empeora al flexionar o toser', 'Hormigueo o adormecimiento', 'Rigidez matutina'],
    warningSigns: ['Pérdida de control de esfínteres', 'Debilidad progresiva en la pierna', 'Adormecimiento en silla de montar', 'Dolor nocturno intenso'],
    suggestedTests: ['Exploración neurológica (Lasègue)', 'Resonancia magnética lumbar', 'Electromiografía si persiste'],
    prognosis: 'La mayoría mejora en 6–12 semanas con tratamiento conservador y fisioterapia.',
  },
  'cond-angina': {
    image: '/assets/images/dx-angina.png',
    alt: 'Render holográfico del corazón con una arteria coronaria obstruida en rojo y una onda de electrocardiograma',
    icd10: 'I20.9',
    summary: 'Isquemia del miocardio por obstrucción coronaria; el infarto agudo es una emergencia que compromete la vida.',
    keyFindings: ['Dolor opresivo retroesternal', 'Irradiación a brazo, mandíbula o espalda', 'Desencadenado por esfuerzo', 'Sudoración fría y malestar'],
    warningSigns: ['Dolor que no cede en reposo', 'Falta de aire', 'Desmayo', 'Sensación de muerte inminente'],
    suggestedTests: ['Electrocardiograma inmediato', 'Troponinas seriadas', 'Ecocardiograma', 'Coronariografía'],
    prognosis: 'Depende del tiempo hasta el tratamiento: cada minuto cuenta para salvar músculo cardíaco.',
  },
  'cond-gripe': {
    image: '/assets/images/dx-gripe.png',
    alt: 'Render holográfico de pulmones y vías respiratorias altas con partículas virales brillando en turquesa',
    icd10: 'J11.1',
    summary: 'Infección viral respiratoria aguda con fiebre, tos y malestar general; muy contagiosa.',
    keyFindings: ['Fiebre de inicio brusco', 'Tos seca y dolor de garganta', 'Dolores musculares', 'Contacto reciente con enfermos'],
    warningSigns: ['Dificultad para respirar', 'Fiebre mayor a 3 días', 'Dolor torácico al respirar', 'Confusión'],
    suggestedTests: ['Test rápido de gripe/COVID-19', 'Pulsioximetría', 'Radiografía de tórax si hay disnea'],
    prognosis: 'Recuperación en 5–10 días; mayor riesgo en mayores, embarazadas y crónicos.',
  },
  'cond-neumonia': {
    image: '/assets/images/dx-neumonia.png',
    alt: 'Render holográfico de pulmones con un área de consolidación infecciosa en el lóbulo inferior resaltada en rojo',
    icd10: 'J18.9',
    summary: 'Infección del parénquima pulmonar que requiere valoración médica y, a menudo, antibióticos.',
    keyFindings: ['Fiebre alta con escalofríos', 'Tos con expectoración', 'Dolor torácico pleurítico', 'Respiración rápida'],
    warningSigns: ['Labios azulados', 'Saturación de oxígeno menor a 92%', 'Confusión', 'Fiebre que no cede'],
    suggestedTests: ['Radiografía de tórax', 'Pulsioximetría', 'Hemograma y PCR', 'Cultivo de esputo'],
    prognosis: 'Buena con tratamiento oportuno; vigilancia estrecha en adultos mayores.',
  },
  'cond-itu': {
    image: '/assets/images/dx-itu.png',
    alt: 'Render holográfico de la vejiga urinaria y la uretra con la inflamación resaltada en ámbar',
    icd10: 'N39.0',
    summary: 'Infección bacteriana del tracto urinario inferior, más frecuente en mujeres; puede ascender al riñón.',
    keyFindings: ['Ardor al orinar (disuria)', 'Urgencia y frecuencia miccional', 'Dolor suprapúbico', 'Orina turbia o con mal olor'],
    warningSigns: ['Fiebre alta con escalofríos', 'Dolor lumbar', 'Sangre en la orina', 'Vómitos'],
    suggestedTests: ['Tira reactiva de orina', 'Urocultivo con antibiograma', 'Ecografía renal si es recurrente'],
    prognosis: 'Excelente con antibiótico dirigido; mejoría en 24–72 h.',
  },
  'cond-colico-renal': {
    image: '/assets/images/dx-colico-renal.png',
    alt: 'Render holográfico de un riñón con un cálculo renal y el uréter resaltados en ámbar',
    icd10: 'N23',
    summary: 'Dolor intenso causado por el paso de un cálculo por el uréter, con obstrucción transitoria del flujo urinario.',
    keyFindings: ['Dolor lumbar en oleadas', 'Irradiación a ingle y genitales', 'Náuseas y vómitos', 'Inquietud; no encuentra postura'],
    warningSigns: ['Fiebre con dolor lumbar', 'Imposibilidad de orinar', 'Vómitos incoercibles', 'Dolor que no cede con analgesia'],
    suggestedTests: ['Análisis de orina', 'Ecografía renal', 'TAC sin contraste', 'Función renal'],
    prognosis: 'Cálculos pequeños se expulsan solos en 1–3 semanas; los grandes requieren procedimiento.',
  },
  'cond-urticaria': {
    image: '/assets/images/dx-urticaria.png',
    alt: 'Render holográfico de un corte de piel con ronchas elevadas y reacción de histamina resaltadas en verde',
    icd10: 'L50.9',
    summary: 'Reacción cutánea con ronchas pruriginosas y migratorias mediada por histamina, aguda o crónica.',
    keyFindings: ['Ronchas rojas y elevadas', 'Picazón intensa', 'Lesiones que cambian de sitio', 'Desaparecen en menos de 24 h'],
    warningSigns: ['Hinchazón de labios o lengua', 'Dificultad para respirar', 'Mareo o desmayo', 'Voz ronca'],
    suggestedTests: ['Historia de desencadenantes', 'Pruebas alérgicas', 'Hemograma e IgE si es crónica'],
    prognosis: 'La forma aguda suele resolverse en días; la crónica requiere seguimiento especializado.',
  },
  'cond-vertigo': {
    image: '/assets/images/dx-vertigo.png',
    alt: 'Render holográfico del oído interno con canales semicirculares y otolitos resaltados en ámbar',
    icd10: 'H81.1',
    summary: 'Vértigo breve desencadenado por cambios de posición de la cabeza, por desplazamiento de otolitos en el oído interno.',
    keyFindings: ['Sensación de giro de segundos', 'Desencadenado al girarse en la cama', 'Náuseas asociadas', 'Sin pérdida de audición'],
    warningSigns: ['Vértigo con dolor de cabeza intenso', 'Visión doble', 'Dificultad para hablar', 'Debilidad en un lado del cuerpo'],
    suggestedTests: ['Maniobra de Dix-Hallpike', 'Exploración vestibular', 'Audiometría si hay hipoacusia'],
    prognosis: 'Muy buena; la maniobra de Epley resuelve la mayoría de casos en una o dos sesiones.',
  },
};

const baseConditions: BaseCondition[] = [
  {
    id: 'cond-apendicitis',
    name: 'Apendicitis aguda',
    module: 'Gastrointestinal',
    triage: 'red',
    specialty: 'Cirugía general / Urgencias',
    firstAid: ['No comer ni beber hasta ser valorado', 'No tomar analgésicos fuertes ni laxantes', 'No aplicar calor local', 'Acudir a urgencias hoy'],
    rationale: 'Dolor que migra a fosa ilíaca derecha, inicio agudo, náuseas y fiebre apuntan a inflamación apendicular.',
    weights: { 'onset-minutes': 3, 'onset-days': 2, 'loc-migratory': 6, 'char-stab': 2, 'acc-nausea': 4, 'acc-fever': 3, 'trg-food': 1 },
  },
  {
    id: 'cond-gastritis',
    name: 'Gastritis',
    module: 'Gastrointestinal',
    triage: 'yellow',
    specialty: 'Gastroenterología',
    firstAid: ['Evitar alcohol, café y picantes', 'Comidas pequeñas y frecuentes', 'Hidratación fraccionada', 'Consulta en 24–48 h'],
    rationale: 'Ardor epigástrico relacionado con comidas y estrés es típico de irritación de la mucosa gástrica.',
    weights: { 'char-burn': 5, 'trg-food': 4, 'trg-stress': 3, 'acc-nausea': 3, 'loc-local': 1, 'onset-week': 2, 'onset-chronic': 2 },
  },
  {
    id: 'cond-gastroenteritis',
    name: 'Gastroenteritis',
    module: 'Gastrointestinal',
    triage: 'green',
    specialty: 'Medicina familiar',
    firstAid: ['Sales de rehidratación oral', 'Dieta blanda progresiva', 'Reposo', 'Consultar si dura más de 3 días'],
    rationale: 'Diarrea, náuseas y fiebre con inicio reciente sugieren infección intestinal autolimitada.',
    weights: { 'acc-diarrhea': 6, 'acc-nausea': 4, 'acc-fever': 2, 'char-colic': 4, 'onset-days': 2, 'trg-cold': 1 },
  },
  {
    id: 'cond-migrana',
    name: 'Migraña',
    module: 'Neurológico',
    triage: 'yellow',
    specialty: 'Neurología',
    firstAid: ['Reposo en lugar oscuro y silencioso', 'Hidratación', 'Analgésico simple a dosis habituales', 'Consulta si hay cambios en el patrón'],
    rationale: 'Dolor pulsátil con fotofobia y náuseas, con estrés o falta de sueño como detonantes, es característico.',
    weights: { 'char-throb': 6, 'acc-photophobia': 6, 'acc-nausea': 3, 'trg-stress': 3, 'onset-chronic': 2, 'loc-local': 1 },
  },
  {
    id: 'cond-cefalea',
    name: 'Cefalea tensional',
    module: 'Neurológico',
    triage: 'green',
    specialty: 'Medicina familiar',
    firstAid: ['Descanso y pausas visuales', 'Hidratación', 'Calor local en cuello y hombros', 'Higiene del sueño'],
    rationale: 'Dolor opresivo bilateral, sordo, asociado a estrés y postura, sin signos de alarma.',
    weights: { 'char-press': 5, 'char-dull': 4, 'trg-stress': 4, 'trg-movement': 2, 'loc-diffuse': 3, 'onset-days': 2 },
  },
  {
    id: 'cond-esguince',
    name: 'Esguince de tobillo',
    module: 'Musculoesquelético',
    triage: 'green',
    specialty: 'Traumatología / Fisioterapia',
    firstAid: ['Protocolo RICE: reposo, hielo, compresión, elevación', 'Vendaje funcional', 'Evitar apoyo completo 48 h', 'Radiografía si no puede apoyar'],
    rationale: 'Torcedura con hinchazón y dolor al apoyar es el patrón típico de lesión ligamentaria.',
    weights: { 'trg-trauma': 7, 'acc-swelling': 5, 'trg-movement': 2, 'char-throb': 2, 'loc-local': 3, 'onset-minutes': 2 },
  },
  {
    id: 'cond-hernia',
    name: 'Hernia discal lumbar',
    module: 'Musculoesquelético',
    triage: 'yellow',
    specialty: 'Traumatología / Neurocirugía',
    firstAid: ['Reposo relativo, evitar cargas', 'Calor local', 'Analgesia a dosis habituales', 'Consulta en 24–48 h si hay hormigueo'],
    rationale: 'Dolor lumbar que baja por la pierna con empeoramiento al movimiento sugiere compresión radicular.',
    weights: { 'loc-radiates-leg': 7, 'trg-movement': 4, 'char-stab': 2, 'onset-week': 3, 'onset-chronic': 2 },
  },
  {
    id: 'cond-angina',
    name: 'Angina / Infarto agudo',
    module: 'Cardiovascular',
    triage: 'red',
    specialty: 'Cardiología / Urgencias',
    firstAid: ['Llamar al número de emergencias', 'Sentarse en reposo absoluto', 'Aflojar la ropa', 'Masticar aspirina si no es alérgico y un médico lo indica'],
    rationale: 'Presión torácica con irradiación y esfuerzo como desencadenante exige descartar síndrome coronario.',
    weights: { 'char-press': 5, 'loc-radiates-arm': 7, 'trg-effort': 5, 'acc-chest': 10, 'acc-dizzy': 2 },
  },
  {
    id: 'cond-gripe',
    name: 'Gripe / Cuadro viral',
    module: 'Respiratorio / Infeccioso',
    triage: 'green',
    specialty: 'Medicina familiar',
    firstAid: ['Reposo e hidratación', 'Antitérmico según indicación', 'Aislamiento domiciliario', 'Consultar si hay disnea'],
    rationale: 'Fiebre, tos y malestar general en contexto de contacto cercano indican infección viral.',
    weights: { 'acc-fever': 5, 'acc-cough': 5, 'trg-cold': 4, 'onset-days': 3, 'loc-diffuse': 2 },
  },
  {
    id: 'cond-neumonia',
    name: 'Neumonía',
    module: 'Respiratorio / Infeccioso',
    triage: 'red',
    specialty: 'Neumología / Urgencias',
    firstAid: ['Acudir a valoración médica hoy', 'Hidratación', 'Reposo', 'Vigilar falta de aire'],
    rationale: 'Fiebre alta, tos y dolor torácico al respirar sugieren infección pulmonar que requiere evaluación.',
    weights: { 'acc-fever': 4, 'acc-cough': 5, 'acc-breath': 6, 'char-stab': 3, 'onset-days': 2 },
  },
  {
    id: 'cond-itu',
    name: 'Infección de vías urinarias',
    module: 'Genitourinario',
    triage: 'yellow',
    specialty: 'Urología / Medicina familiar',
    firstAid: ['Aumentar la ingesta de agua', 'Evitar retener la orina', 'Consulta en 24–48 h para urocultivo', 'Acudir antes si hay fiebre alta'],
    rationale: 'Ardor y urgencia al orinar con malestar suprapúbico son el cuadro clásico de cistitis.',
    weights: { 'acc-urine': 8, 'char-burn': 4, 'acc-fever': 2, 'onset-days': 3, 'loc-local': 1 },
  },
  {
    id: 'cond-colico-renal',
    name: 'Cólico renal',
    module: 'Genitourinario',
    triage: 'yellow',
    specialty: 'Urología',
    firstAid: ['Calor local lumbar', 'Hidratación abundante', 'Analgesia a dosis habituales', 'Urgencias si fiebre o vómitos incoercibles'],
    rationale: 'Dolor lumbar en oleadas que se irradia a ingle y se acompaña de náuseas sugiere litiasis.',
    weights: { 'char-colic': 7, 'loc-radiates-leg': 3, 'acc-nausea': 3, 'onset-minutes': 3, 'acc-urine': 2 },
  },
  {
    id: 'cond-urticaria',
    name: 'Urticaria',
    module: 'Dermatológico',
    triage: 'green',
    specialty: 'Dermatología / Alergología',
    firstAid: ['Evitar el posible desencadenante', 'Ropa holgada y fresca', 'Compresas frías', 'Urgencias si hay hinchazón de labios o falta de aire'],
    rationale: 'Ronchas pruriginosas de aparición brusca, migratorias, sugieren reacción histamínica.',
    weights: { 'acc-rash': 8, 'onset-minutes': 3, 'loc-migratory': 3, 'trg-food': 2, 'trg-none': 1 },
  },
  {
    id: 'cond-vertigo',
    name: 'Vértigo paroxístico posicional',
    module: 'Neurológico',
    triage: 'yellow',
    specialty: 'Otorrinolaringología / Neurología',
    firstAid: ['Evitar cambios bruscos de postura', 'Sentarse ante un episodio', 'Evitar conducir', 'Consulta en 24–48 h'],
    rationale: 'Mareo rotatorio breve desencadenado por movimientos de cabeza es típico de origen vestibular.',
    weights: { 'acc-dizzy': 7, 'trg-movement': 5, 'acc-nausea': 3, 'onset-minutes': 2, 'onset-days': 2 },
  },
];

export const conditions: Condition[] = baseConditions.map((c) => ({
  ...c,
  ...conditionDetails[c.id],
}));

export const symptomLabels: Record<string, string> = {
  'sym-dolor-cabeza': 'Dolor de cabeza',
  'sym-fiebre': 'Fiebre',
  'sym-esguince': 'Esguince de tobillo',
  'sym-dolor-abdominal': 'Dolor abdominal',
  'sym-dolor-pecho': 'Dolor en el pecho',
  'sym-tos': 'Tos persistente',
  'sym-garganta': 'Dolor de garganta',
  'sym-vertigo': 'Mareo o vértigo',
  'sym-lumbar': 'Dolor lumbar',
  'sym-ardor': 'Ardor al orinar',
  'sym-erupcion': 'Erupción o ronchas',
  'sym-nauseas': 'Náuseas y vómitos',
  'sym-palpitaciones': 'Palpitaciones',
  'sym-rodilla': 'Dolor de rodilla',
  'sym-picazon': 'Picazón en la piel',
  'sym-hormigueo': 'Hormigueo en brazos o piernas',
};

export interface SessionState {
  entry: string;
  system?: SystemId;
  onset?: string;
  location?: string;
  eva: number;
  character: string[];
  accompanying: string[];
  triggers: string[];
}

export const emptySession: SessionState = {
  entry: '',
  eva: 5,
  character: [],
  accompanying: [],
  triggers: [],
};

export const SESSION_KEY = 'diagnova-session';

export interface ScoredCondition extends Condition {
  score: number;
  percent: number;
  evidence: string[];
}

const optionLabelIndex: Record<string, string> = {};
[
  ...onsetOptions,
  ...locationOptions,
  ...characterOptions,
  ...accompanyingOptions,
  ...triggerOptions,
].forEach((o) => {
  optionLabelIndex[o.id] = o.label;
});

export function labelFor(id: string): string {
  return optionLabelIndex[id] ?? id;
}

export function selectedIds(s: SessionState): string[] {
  const ids: string[] = [];
  if (s.onset) ids.push(s.onset);
  if (s.location) ids.push(s.location);
  ids.push(...s.character, ...s.accompanying, ...s.triggers);
  return ids;
}

export function scoreConditions(s: SessionState): ScoredCondition[] {
  const ids = selectedIds(s);
  const severityBoost = s.eva >= 8 ? 1.15 : s.eva >= 6 ? 1.05 : 1;
  const scored = conditions.map((c) => {
    let score = 0;
    const evidence: string[] = [];
    ids.forEach((id) => {
      const w = c.weights[id];
      if (w) {
        score += w;
        evidence.push(id);
      }
    });
    if (c.triage === 'red') score *= severityBoost;
    return { ...c, score, percent: 0, evidence };
  });
  const positive = scored.filter((c) => c.score > 0).sort((a, b) => b.score - a.score);
  const total = positive.reduce((acc, c) => acc + c.score, 0) || 1;
  const top = positive.slice(0, 5).map((c) => ({
    ...c,
    percent: Math.max(4, Math.round((c.score / total) * 100)),
  }));
  return top;
}

export function overallTriage(list: ScoredCondition[], s: SessionState): TriageLevel {
  if (list.length === 0) return 'green';
  const lead = list[0];
  if (lead.triage === 'red' && lead.percent >= 25) return 'red';
  if (s.eva >= 9) return 'yellow';
  const anyYellow = list.slice(0, 2).some((c) => c.triage === 'yellow');
  if (lead.triage === 'yellow' || anyYellow) return 'yellow';
  return lead.triage;
}

export function hasRedFlag(ids: string[]): Option | undefined {
  return accompanyingOptions.find((o) => o.redFlag && ids.includes(o.id));
}