"use client";

import { Dialog, DialogPanel, DialogTitle, Disclosure, DisclosureButton, DisclosurePanel, Tab, TabGroup, TabList, TabPanel, TabPanels, Transition } from "@headlessui/react";
import {
  Archive,
  BookOpen,
  CalendarDays,
  Camera,
  ChevronDown,
  ExternalLink,
  Flag,
  GraduationCap,
  HeartHandshake,
  Image as ImageIcon,
  Landmark,
  MapPinned,
  MessageCircle,
  Mic2,
  Music2,
  Quote,
  Send,
  Shield,
  Sparkles,
  TrainFront,
  Waves,
  X,
} from "lucide-react";
import { FormEvent, Fragment, useMemo, useState } from "react";

type LocalImageItem = {
  src: string;
  title: string;
  caption: string;
  tone: string;
};

type Comment = {
  name: string;
  body: string;
  tag: string;
};

const localImages: LocalImageItem[] = [
  {
    src: "/recursos/18cc11a5-ec07-4ce0-86b5-ebdff2eabcb6.jpg",
    title: "Barco Moxos",
    caption: "Cada vez que veo el barco Moxos pienso en una ciudad que siempre ha mirado hacia el río.",
    tone: "ribera",
  },
  {
    src: "/recursos/aec2337c-ac70-440e-870a-d5682583f2fb.jpg",
    title: "Plaza y cielo",
    caption: "La plaza guarda tardes de calor, conversaciones cortas y ese cielo grande que abre la ciudad.",
    tone: "plaza",
  },
  {
    src: "/recursos/8b168ee9-ae00-47f6-872f-50dcadd161e0.jpg",
    title: "Camino de tierra",
    caption: "En Guayaramerín también se camina sobre tierra roja; ahí se nota la vida de todos los días.",
    tone: "camino",
  },
  {
    src: "/recursos/ca460848-288d-4cc8-a335-05df966b726d.jpg",
    title: "Calle comercial",
    caption: "El comercio se escucha antes de verse: motos, voces, puertas abiertas y gente resolviendo el día.",
    tone: "calle",
  },
  {
    src: "/recursos/32685824-cce6-4545-a216-67fc8d355a1b.jpg",
    title: "Ribera activa",
    caption: "En la ribera se mezclan espera, trabajo y viaje; por eso el puerto pesa tanto en nuestra memoria.",
    tone: "puerto",
  },
  {
    src: "/recursos/f6eaaf18-f006-4524-a5f9-d7d3d6fedd70.jpg",
    title: "Avenida con movimiento",
    caption: "Hay avenidas que parecen comunes, pero muestran cómo la ciudad despierta y respira.",
    tone: "ritmo",
  },
  {
    src: "/recursos/004dee82-be71-433c-8585-4d31d22ddf72.jpg",
    title: "Detalle urbano",
    caption: "Una esquina, una pared, una sombra: detalles pequeños que también me dicen de dónde soy.",
    tone: "detalle",
  },
  {
    src: "/recursos/a8ffe682-d907-4ff0-a34a-b5cc62c64e89.jpg",
    title: "Rincón de memoria",
    caption: "La ciudad tiene lugares que una mira rápido, pero después recuerda con cariño.",
    tone: "memoria",
  },
  {
    src: "/recursos/cf5295c3-ce14-4c39-a75f-be26220804fb.jpg",
    title: "Ciudad viva",
    caption: "Lo cotidiano también tiene historia: personas, gestos y espacios que sostienen la ciudad.",
    tone: "vida",
  },
];

const galleryImages: LocalImageItem[] = [
  ...localImages,
  {
    src: "/recursos/0921958a-ec8f-4ea6-b6df-b8d62966f146.jpg",
    title: "Tarde abierta",
    caption: "Hay cielos que hacen que la ciudad parezca más amplia de lo que una recuerda.",
    tone: "cielo",
  },
  {
    src: "/recursos/124e578a-3fa4-41b0-83e4-9dd114bf02c7.jpg",
    title: "Paso cotidiano",
    caption: "Entre una calle y otra también aparece la manera en que vivimos Guayaramerín.",
    tone: "calle",
  },
  {
    src: "/recursos/1ec6e4f8-e5d5-4b12-807e-81a94a306a25.jpg",
    title: "Lugar conocido",
    caption: "No todas las fotos necesitan explicar algo; algunas solo devuelven una sensación familiar.",
    tone: "memoria",
  },
  {
    src: "/recursos/234f6638-edcf-4bb0-be6d-246f43fa3cdc.jpg",
    title: "Rumbo de ciudad",
    caption: "Cada recorrido deja una pequeña marca de pertenencia, aunque parezca parte de la rutina.",
    tone: "rumbo",
  },
  {
    src: "/recursos/3c1a18ff-bd1e-4f10-bd1a-2b25f0484bb4.jpg",
    title: "Luz de la tarde",
    caption: "La luz cae distinto cuando una mira su propio lugar con más atención.",
    tone: "luz",
  },
  {
    src: "/recursos/4199db4a-b03c-48c2-afef-7c1606f52340.jpg",
    title: "Entre calles",
    caption: "Guayaramerín también se cuenta desde sus esquinas, sus pausas y sus sonidos.",
    tone: "esquina",
  },
  {
    src: "/recursos/4fd8543c-3d6b-4681-940d-726b3533d2ac.jpg",
    title: "Rastro urbano",
    caption: "A veces lo que parece simple termina siendo una forma de recordar de dónde venimos.",
    tone: "urbano",
  },
  {
    src: "/recursos/57c8cd68-29f0-4090-be57-d85a4f909f46.jpg",
    title: "Ciudad en movimiento",
    caption: "La ciudad nunca está quieta: siempre hay alguien pasando, vendiendo, mirando o esperando.",
    tone: "movimiento",
  },
  {
    src: "/recursos/5a8f0c39-38e9-4eaf-b10f-2fb97277937d.jpg",
    title: "Memoria de paso",
    caption: "Cada foto guarda algo de lo que se ve y también algo de lo que se siente.",
    tone: "paso",
  },
  {
    src: "/recursos/6cfe1a5a-1ec0-4d8d-8475-4632839e1814.jpg",
    title: "Mirada cercana",
    caption: "Cuando una observa con calma, hasta los lugares comunes empiezan a hablar.",
    tone: "cercanía",
  },
  {
    src: "/recursos/6df4a32c-04f2-48a1-87bf-244a69989811.jpg",
    title: "Aire de frontera",
    caption: "Guayaramerín tiene ese aire de llegada y salida que se siente en sus caminos.",
    tone: "frontera",
  },
  {
    src: "/recursos/6e450784-e53b-4aa3-a007-d15b248bef72.jpg",
    title: "Escena diaria",
    caption: "Lo diario también merece guardarse, porque ahí vive gran parte de la memoria.",
    tone: "día",
  },
  {
    src: "/recursos/7073de43-1c25-4381-a16f-30bda719281a.jpg",
    title: "Ciudad bajo cielo",
    caption: "Entre el calor, las nubes y el movimiento, aparece una ciudad que reconozco como mía.",
    tone: "cielo",
  },
  {
    src: "/recursos/70ffe15d-ca7a-41b4-a026-c53060bc274d.jpg",
    title: "Ruta pequeña",
    caption: "Algunas rutas parecen cortas, pero conectan recuerdos, familias y costumbres.",
    tone: "ruta",
  },
  {
    src: "/recursos/71908642-840f-4a8f-810a-9ac0393236fb.jpg",
    title: "Otra postal",
    caption: "Una imagen más de ese Guayaramerín que se mira mejor cuando se lo cuenta con cariño.",
    tone: "postal",
  },
];

const storyBlocks = [
  {
    icon: MapPinned,
    kicker: "Mi punto de partida",
    title: "Escuché antes de escribir",
    body: "Cuando entrevisté al Dr. Prof. Jesús Suárez Chimanacay, entendí que Guayaramerín no se cuenta de una sola forma. Cada recuerdo abre una pregunta y cada fecha trae otra historia detrás.",
  },
  {
    icon: Waves,
    kicker: "Territorio",
    title: "Una ciudad junto al río",
    body: "Mientras escuchaba la entrevista, una idea se me quedó grabada: el puerto y el pueblo no son lo mismo, pero se necesitan para entendernos. La ribera, el comercio y los caminos explican mucho de lo que somos.",
  },
  {
    icon: HeartHandshake,
    kicker: "Identidad",
    title: "Lo que nos reconoce",
    body: "Cuando se habla del Guayaripoi, del sarao, del himno, del escudo o de la bandera, no se habla solo de símbolos. Se habla de una forma de decir: esta es nuestra ciudad y también tiene voz propia.",
  },
];

const timelineEvents = [
  {
    year: "1892",
    title: "Fundacion recordada",
    detail: "En la conversación, el 19 de agosto de 1892 aparece como una raíz importante para hablar del nacimiento de Guayaramerín.",
  },
  {
    year: "1905",
    title: "Puerto Sucre",
    detail: "Aquí entendí algo que cambia la mirada: Puerto Sucre aparece como puerto, no como el nacimiento del pueblo.",
  },
  {
    year: "1915",
    title: "Nombre restituido",
    detail: "El nombre vuelve a moverse y la memoria local recupera una parte de lo que antes parecía confundido.",
  },
  {
    year: "1931",
    title: "Junta Municipal",
    detail: "La ciudad empieza a verse también desde su organización, sus autoridades y las personas que asumieron responsabilidades públicas.",
  },
  {
    year: "1989",
    title: "Encuentro de historiadores",
    detail: "Me llamó la atención imaginar a varias personas reunidas para defender fechas, documentos y recuerdos sobre la ciudad.",
  },
  {
    year: "1992",
    title: "Ciudad e identidad",
    detail: "La identidad se vuelve más visible: no basta con vivir en un lugar, también queremos nombrarlo, cantarlo y representarlo.",
  },
];

const heritageSymbols: LocalImageItem[] = [
  {
    src: "/historia/bandera-guayaramerin.png",
    title: "Bandera de Guayaramerín",
    caption: "La entendí mejor cuando la conecté con el Guayaripoi: en la entrevista se cuenta que el tipoy fue tomando los colores de la bandera, como si el símbolo bajara del mástil al cuerpo de la gente.",
    tone: "símbolo",
  },
  {
    src: "/historia/escudo-guayaramerin.jpg",
    title: "Escudo de la ciudad",
    caption: "Al mirar el escudo aparecen río, canoa, camino, vegetación y tren. No lo veo como dibujo aislado: lo conecto con el puerto, la frontera, el comercio y los recorridos que aparecen en las fotos.",
    tone: "memoria",
  },
];

const oldMemoryImages: LocalImageItem[] = [
  {
    src: "/historia/porto-velho-madeira-mamore-1912.jpg",
    title: "Ferrocarril Madera-Mamoré, 1912",
    caption: "Esta foto antigua no muestra exactamente mi calle, pero sí el mundo que rodeó a Guayaramerín: el caucho, las cachuelas, el río y la necesidad de mover carga hacia el Atlántico.",
    tone: "archivo",
  },
  {
    src: "/historia/decauville-madeira-mamore-1913.jpg",
    title: "Rieles entre selva y trabajo",
    caption: "La ferrovia del lado brasileño ayuda a entender por qué el puerto tenía tanta importancia. Frente a Guajará-Mirim, Guayaramerín no era un lugar aislado: era parte de una ruta mayor.",
    tone: "frontera",
  },
  {
    src: "/historia/trabalhadores-madeira-mamore-1910.jpg",
    title: "Trabajadores de la ruta amazónica",
    caption: "Cuando en la entrevista se habla de migraciones desde Cachuela, Baure o San Joaquín, estas imágenes antiguas me ayudan a imaginar una región movida por trabajo, distancia y búsqueda de futuro.",
    tone: "migración",
  },
];

const researchConnections = [
  {
    icon: Waves,
    title: "El barco de la foto y la discusión del puerto",
    body: "La imagen del barco Moxos no queda como postal. Se conecta con lo que el Dr. Prof. Jesús Suárez Chimanacay aclara: Puerto Sucre fue puerto, no pueblo. Por eso la ribera en mis fotos no es solo paisaje, es el lugar donde se entiende la confusión histórica.",
  },
  {
    icon: Flag,
    title: "La bandera y el Guayaripoi",
    body: "En el audio se menciona que el Guayaripoi fue actualizado con los colores de la bandera. Ahí entendí que el símbolo no vive solo en actos oficiales: también puede aparecer en la vestimenta, el baile y la fiesta.",
  },
  {
    icon: Shield,
    title: "El escudo y las calles que fotografié",
    body: "El escudo reúne río, camino, canoa, vegetación y tren. Eso conversa con mis fotos de avenida, comercio y tierra roja: la ciudad actual todavía lleva dentro esas rutas antiguas de entrada, salida y encuentro.",
  },
  {
    icon: TrainFront,
    title: "Las fotos antiguas y las migraciones",
    body: "La investigación sobre el ferrocarril Madera-Mamoré me ayudó a escuchar mejor la parte donde se habla de gente que llegó desde otros lugares. Las migraciones no fueron un detalle suelto: fueron parte de una Amazonía conectada por caucho, ríos y trabajo.",
  },
];

const sourceLinks = [
  {
    label: "Material educativo sobre el Guayaripoi",
    href: "https://red.minedu.gob.bo/repositorio/fuente/10100.pdf",
  },
  {
    label: "Panorama general de Guayaramerín",
    href: "https://es.wikipedia.org/wiki/Guayaramer%C3%ADn",
  },
  {
    label: "Ley 3500 sobre símbolos oficiales",
    href: "https://www.lexivox.org/norms/BO-L-3500.xhtml",
  },
  {
    label: "Artículo sobre río Mamoré y cachuelas",
    href: "https://iconos.flacsoandes.edu.ec/index.php/iconos/article/view/4670/3671",
  },
  {
    label: "Archivos visuales en Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:Trabalhadores_da_Ferrovia_Madeira-Mamor%C3%A9_-_1195,_Acervo_do_Museu_Paulista_da_USP.jpg",
  },
];

const transcriptHighlights = [
  {
    label: "Fecha que vuelve",
    quote: "La verdadera fecha de fundación de Guayaramerín es el 19 de agosto de 1892.",
  },
  {
    label: "Una aclaración",
    quote: "En 1905 se crea el puerto, no el pueblo.",
  },
  {
    label: "Fiesta vivida",
    quote: "La gente de Guayaramerín celebraba el 8 de diciembre como fiesta civil y patronal.",
  },
  {
    label: "Símbolo propio",
    quote: "Se quería algo que nos identifique.",
  },
];

const methodNotes = [
  {
    title: "Primero escuché la entrevista completa.",
    body: "No quise empezar escribiendo como si ya supiera todo. Preferí escuchar las dos partes, detenerme en las fechas y quedarme con las frases que más me hacían pensar en mi ciudad.",
  },
  {
    title: "Después elegí los recuerdos que más pesaban.",
    body: "Algunas partes hablaban de leyes y nombres, pero detrás de eso yo sentía una pregunta más cercana: cómo se fue formando el lugar donde crecimos.",
  },
  {
    title: "Escribí desde mi voz, no solo desde los datos.",
    body: "Este blog no quiere sonar como una clase. Quiere sonar como una estudiante contando lo que descubrió mientras escuchaba a alguien que conoce la historia local.",
  },
  {
    title: "Dejé un espacio para que otras personas respondan.",
    body: "Guayaramerín también se cuenta en conversación. Por eso el foro queda abierto para recuerdos, dudas, fechas conocidas en casa o símbolos que cada persona lleva consigo.",
  },
];

const interviewInfo = {
  interviewee: "Corregidor de Guayaramerín - Dr. Prof. Jesús Suárez Chimanacay",
  interviewer: "Est. Evelin Gutierrez Duran",
};

const audioItems = [
  {
    src: "/audios/AUDIO-2026-06-29-12-44-52.mp4",
    transcript: "/transcripts/audio-01.txt",
    title: "La entrevista | Parte 1",
    detail: "En esta primera parte hablamos de migraciones, Cachuela Esperanza, símbolos locales y recuerdos sobre cómo fue organizándose Guayaramerín.",
  },
  {
    src: "/audios/AUDIO-2026-06-29-12-44-53.m4a.mp4",
    transcript: "/transcripts/audio-02.txt",
    title: "La entrevista | Parte 2",
    detail: "En la segunda parte aparecen Puerto Palmira, Puerto Sucre, la Junta Municipal y la discusión sobre la fundación de la ciudad.",
  },
];

const initialComments: Comment[] = [
  {
    name: "Lectora invitada",
    tag: "identidad",
    body: "Me gustó leerlo así, porque no se queda solo en paisaje. Se siente como una conversación sobre lo que somos y lo que a veces olvidamos preguntar.",
  },
  {
    name: "Companero de aula",
    tag: "comunicacion",
    body: "La parte que más me llamó la atención fue la diferencia entre puerto y pueblo. Es algo que muchos repetimos sin detenernos a pensarlo.",
  },
];

function LocalImage({
  item,
  className,
  priority = false,
}: {
  item: LocalImageItem;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full min-h-[18rem] w-full items-center justify-center bg-[linear-gradient(135deg,#0f5d66,#2f6b3f_48%,#b14f2b)] text-white ${className ?? ""}`}
      >
        <div className="max-w-xs px-6 text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.22em]">Foto de Guayaramerín</p>
          <p className="mt-2 text-sm opacity-85">{item.title}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.caption}
      loading={priority ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b14f2b]">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-black leading-tight text-[#111713] md:text-5xl">{title}</h2>
      <p className="mt-5 text-pretty text-base leading-8 text-[#445148] md:text-lg">{children}</p>
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<LocalImageItem | null>(null);
  const [comments, setComments] = useState(initialComments);
  const [form, setForm] = useState({ name: "", body: "" });

  const heroImage = localImages[0];
  const doubledCaptions = useMemo(() => [...localImages, ...localImages], []);

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim() || "Visitante";
    const body = form.body.trim();

    if (!body) {
      return;
    }

    setComments((current) => [{ name, body, tag: "foro", }, ...current]);
    setForm({ name: "", body: "" });
  }

  return (
    <main className="overflow-hidden">
      <section className="relative min-h-[92vh] bg-[#111713] text-white">
        <div className="absolute inset-0">
          <LocalImage item={heroImage} priority className="opacity-62" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,23,19,0.92),rgba(17,23,19,0.56)_45%,rgba(17,23,19,0.18))]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(247,244,237,1))]" />
        </div>

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
          <a href="#inicio" className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/12">
              <Waves className="h-5 w-5" aria-hidden="true" />
            </span>
            Guayaramerín
          </a>
          <div className="hidden items-center gap-2 rounded-full border border-white/18 bg-white/10 px-2 py-2 backdrop-blur md:flex">
            {["relato", "historia", "imagenes", "audios", "foro"].map((item) => (
              <a key={item} href={`#${item}`} className="rounded-full px-4 py-2 text-sm font-semibold text-white/78 transition hover:bg-white hover:text-[#111713]">
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div id="inicio" className="relative z-10 mx-auto grid w-full min-w-0 max-w-7xl gap-10 px-5 pb-24 pt-16 md:grid-cols-[1.08fr_0.72fr] md:px-8 md:pb-28 md:pt-24">
          <div className="min-w-0 max-w-[calc(100vw-2.5rem)] md:max-w-4xl">
            <div className="inline-flex w-full max-w-full items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-semibold text-white/82 backdrop-blur sm:w-auto">
              <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 truncate">UAB del Beni | Comunicación Social | 4to semestre</span>
            </div>
            <h1 className="mt-7 max-w-5xl text-balance text-[2.65rem] font-black leading-[0.98] tracking-normal min-[420px]:text-[3rem] sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block">Guayaramerín</span>
              <span className="block">en mi voz</span>
            </h1>
            <p className="mt-7 max-w-full text-pretty text-lg leading-8 text-white/82 md:max-w-2xl md:text-xl">
              Este es mi recorrido por Guayaramerín: una ciudad de río, calles de tierra roja, comercio, memoria y voces que todavía enseñan a mirar el lugar de donde vengo.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#relato" className="inline-flex w-full max-w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#d79b35] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#111713] transition duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:px-6">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                Leer relato
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full max-w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/22 bg-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#111713] sm:w-auto sm:px-6 sm:tracking-[0.12em]"
              >
                <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0">Cómo nació el relato</span>
              </button>
            </div>
          </div>

          <aside className="story-shadow float-slow w-full min-w-0 max-w-[calc(100vw-2.5rem)] self-end rounded-[2rem] border border-white/20 bg-white/12 p-5 backdrop-blur-xl md:max-w-none">
            <div className="min-w-0 rounded-[1.5rem] bg-[#f7f4ed] p-5 text-[#111713]">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0f5d66]">Autora</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">Evelin Gutierrez Duran</h2>
              <p className="mt-4 text-sm leading-7 text-[#445148]">
                Soy estudiante de Comunicación Social en la Universidad Autónoma del Beni. Desde mi voz quiero contar Guayaramerín con sus recuerdos, sus preguntas y la entrevista que realicé al {interviewInfo.interviewee}.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Formato", "Blog-foro"],
                  ["Lugar", "Guayaramerín"],
                  ["Region", "Beni"],
                  ["Pais", "Bolivia"],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0 rounded-2xl border border-[#111713]/10 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b14f2b]">{label}</p>
                    <p className="mt-1 break-words text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#111713]/10 bg-[#111713] py-4 text-white">
        <div className="marquee-track flex gap-3 whitespace-nowrap">
          {doubledCaptions.map((image, index) => (
            <span key={`${image.src}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white/80">
              <Camera className="h-4 w-4 text-[#d79b35]" aria-hidden="true" />
              {image.title}
            </span>
          ))}
        </div>
      </section>

      <section id="relato" className="relative px-5 py-24 md:px-8 md:py-32">
        <div className="river-noise absolute inset-0 opacity-45" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader eyebrow="Relato principal" title="Una historia que primero se escucha">
            Empecé escuchando una entrevista que me hizo mirar distinto mi propia ciudad. Entre fechas, nombres y recuerdos, Guayaramerín dejó de ser solo el lugar donde vivo y empezó a sentirse como una historia que también me toca contar.
          </SectionHeader>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {storyBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <article key={block.title} className="reveal-up story-shadow group rounded-[1.75rem] border border-[#111713]/10 bg-white/86 p-7 transition duration-500 hover:-translate-y-2 hover:bg-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f5d66] text-white transition duration-500 group-hover:rotate-3 group-hover:bg-[#b14f2b]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#b14f2b]">{block.kicker}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">{block.title}</h3>
                  <p className="mt-5 text-pretty text-[15px] leading-8 text-[#4d5a51]">{block.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="reveal-up rounded-[2rem] bg-[#111713] p-7 text-white md:p-8">
              <Archive className="h-10 w-10 text-[#d79b35]" aria-hidden="true" />
              <h3 className="mt-6 text-3xl font-black leading-tight">La voz que me abrió el camino</h3>
              <p className="mt-5 text-pretty text-sm leading-7 text-white/72">
                El Dr. Prof. Jesús Suárez Chimanacay no solo mencionó fechas. También fue uniendo nombres, puertos, fiestas y símbolos que muchas veces escuchamos por separado. Al escucharlo, sentí que la historia local está más cerca de lo que parece.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {transcriptHighlights.map((item) => (
                <article key={item.label} className="reveal-up rounded-[1.35rem] border border-[#111713]/10 bg-white/90 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b14f2b]">{item.label}</p>
                  <p className="mt-4 text-pretty text-lg font-black leading-snug text-[#111713]">"{item.quote}"</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ed] px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Linea historica" title="Fechas que la entrevista pone en conversacion">
            No escribo estas fechas para cerrar una discusión. Las coloco como señales de una conversación que me ayudó a entender mejor cómo se ha contado Guayaramerín.
          </SectionHeader>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {timelineEvents.map((event) => (
              <article key={`${event.year}-${event.title}`} className="reveal-up story-shadow rounded-[1.6rem] border border-[#111713]/10 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0f5d66]/12 px-4 py-2 text-sm font-black text-[#0f5d66]">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {event.year}
                  </span>
                  <Landmark className="h-5 w-5 text-[#b14f2b]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-black">{event.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#4d5a51]">{event.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="historia" className="bg-[#f7f4ed] px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Historia y símbolos" title="Lo que encontré se conectó con lo que escuché">
            Al buscar más sobre Guayaramerín, no quise poner datos por separado. Fui uniendo la investigación con la entrevista y con mis fotos: el río con el puerto, la bandera con el Guayaripoi, el escudo con los caminos y las imágenes antiguas con las migraciones.
          </SectionHeader>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {researchConnections.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="reveal-up story-shadow rounded-[1.5rem] border border-[#111713]/10 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f5d66] text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-black leading-tight text-[#111713]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4d5a51]">{item.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="reveal-up rounded-[2rem] bg-[#111713] p-7 text-white md:p-8">
              <Flag className="h-10 w-10 text-[#d79b35]" aria-hidden="true" />
              <h3 className="mt-6 text-3xl font-black leading-tight">Símbolos que dejaron de parecer lejanos</h3>
              <p className="mt-5 text-pretty text-sm leading-7 text-white/72">
                Antes pensaba en bandera, escudo e himno como cosas de actos cívicos. Después de la entrevista los miré distinto: también están en la ropa típica, en las fiestas, en el orgullo de nombrar la ciudad y en la forma en que una comunidad decide reconocerse.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-sm leading-7 text-white/70">
                <Music2 className="h-5 w-5 shrink-0 text-[#d79b35]" aria-hidden="true" />
                <span>El himno aparece en la investigación como símbolo oficial y en la entrevista como parte de esa búsqueda por tener una identidad propia.</span>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {heritageSymbols.map((symbol) => (
                <article key={symbol.src} className="reveal-up story-shadow overflow-hidden rounded-[1.6rem] border border-[#111713]/10 bg-white">
                  <div className="flex aspect-[4/3] items-center justify-center bg-white p-7">
                    <LocalImage item={symbol} className="object-contain" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b14f2b]">{symbol.tone}</p>
                    <h3 className="mt-3 text-2xl font-black text-[#111713]">{symbol.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4d5a51]">{symbol.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="reveal-up">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b14f2b]">Antes del presente</p>
                <h3 className="mt-4 text-balance text-3xl font-black leading-tight text-[#111713] md:text-5xl">Fotos antiguas para imaginar la región</h3>
                <p className="mt-5 text-pretty text-base leading-8 text-[#445148]">
                  No siempre encontré una foto antigua exacta de la misma esquina que camino hoy. Pero las imágenes del ferrocarril Madera-Mamoré ayudan a imaginar el contexto: una frontera amazónica movida por el caucho, los ríos, las cachuelas y el trabajo.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {oldMemoryImages.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setSelectedPhoto(image)}
                    className="reveal-up group overflow-hidden rounded-[1.5rem] border border-[#111713]/10 bg-white text-left shadow-sm outline-none transition duration-500 hover:-translate-y-1 hover:border-[#b14f2b]/60 focus-visible:ring-4 focus-visible:ring-[#d79b35]/40"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#111713]">
                      <LocalImage item={image} className="transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(17,23,19,0.55))]" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b14f2b]">{image.tone}</p>
                      <h4 className="mt-3 text-xl font-black text-[#111713]">{image.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-[#4d5a51]">{image.caption}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-[1.5rem] border border-[#111713]/10 bg-white p-6">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#b14f2b]">Para seguir leyendo</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {sourceLinks.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[#111713]/10 bg-[#f7f4ed] px-4 py-4 text-sm font-black text-[#111713] transition hover:border-[#0f5d66] hover:text-[#0f5d66]"
                >
                  <span>{source.label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ed] px-5 pb-24 md:px-8 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="reveal-up rounded-[2rem] bg-[#111713] p-7 text-white md:p-9">
            <Quote className="h-10 w-10 text-[#d79b35]" aria-hidden="true" />
            <p className="mt-8 text-pretty text-2xl font-black leading-snug md:text-4xl">
              Mi ciudad no se cuenta solo con paisaje; se cuenta con voces que discuten fechas, recuerdan nombres y defienden una identidad.
            </p>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-white/60">Evelin Gutierrez Duran</p>
          </div>

          <div className="grid gap-4">
            {methodNotes.map((note, index) => (
              <Disclosure key={note.title} as="div" className="reveal-up rounded-[1.25rem] border border-[#111713]/10 bg-white">
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                      <span className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d79b35]/18 text-sm font-black text-[#9a3d22]">
                          0{index + 1}
                        </span>
                        <span className="text-base font-black text-[#111713] md:text-lg">{note.title}</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition duration-300 ${open ? "rotate-180 text-[#b14f2b]" : "text-[#445148]"}`} aria-hidden="true" />
                    </DisclosureButton>
                    <DisclosurePanel className="px-6 pb-6 text-sm leading-7 text-[#4d5a51]">
                      {note.body}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <section id="imagenes" className="bg-[#111713] px-5 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Fotos de mi ciudad" title="Guayaramerín también se mira">
            Hay lugares que una conoce desde siempre, pero al fotografiarlos se vuelven nuevos. Estas imágenes acompañan mi relato porque muestran la ciudad que camino, recuerdo y reconozco.
          </SectionHeader>

          <TabGroup className="mt-14">
            <TabList className="mx-auto flex max-w-2xl rounded-full border border-white/12 bg-white/8 p-2">
              {["Postales", "Memoria", "Territorio"].map((tab) => (
                <Tab
                  key={tab}
                  className="w-full rounded-full px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-white/62 outline-none transition data-[hover]:bg-white/10 data-[selected]:bg-[#d79b35] data-[selected]:text-[#111713]"
                >
                  {tab}
                </Tab>
              ))}
            </TabList>

            <TabPanels className="mt-10">
              {[0, 1, 2].map((group) => (
                <TabPanel key={group} className="grid gap-5 outline-none sm:grid-cols-2 lg:grid-cols-3">
                  {localImages.slice(group * 3, group * 3 + 3).map((image, index) => (
                    <article key={image.src} className={`reveal-up group overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/8 ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <LocalImage item={image} className="transition duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(17,23,19,0.84))]" />
                        <div className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#111713]">
                          <Camera className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d79b35]">Mirada / {image.tone}</p>
                        <h3 className="mt-3 text-2xl font-black">{image.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-white/72">{image.caption}</p>
                      </div>
                    </article>
                  ))}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          <div className="mt-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#d79b35]">Galería de fotos</p>
                <h3 className="mt-3 text-balance text-3xl font-black leading-tight md:text-5xl">Pequeñas escenas de Guayaramerín</h3>
              </div>
              <p className="max-w-xl text-pretty text-sm leading-7 text-white/68">
                Reuní estas fotos como quien arma un álbum: no para explicar todo, sino para dejar que cada imagen muestre un pedazo de la ciudad.
              </p>
            </div>

            <div className="mt-9 grid auto-rows-[13rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((photo, index) => (
                <button
                  key={`${photo.src}-${index}`}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/8 text-left outline-none transition duration-500 hover:-translate-y-1 hover:border-[#d79b35]/70 focus-visible:ring-4 focus-visible:ring-[#d79b35]/40 ${
                    index % 8 === 0 ? "sm:col-span-2 sm:row-span-2" : index % 5 === 0 ? "lg:row-span-2" : ""
                  }`}
                  aria-label={`Abrir foto: ${photo.title}`}
                >
                  <LocalImage item={photo} className="transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,23,19,0.02),rgba(17,23,19,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d79b35]">{photo.tone}</p>
                    <p className="mt-2 text-xl font-black text-white">{photo.title}</p>
                  </div>
                  <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#111713] opacity-0 transition duration-300 group-hover:opacity-100">
                    <Camera className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="audios" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b14f2b]">Audios</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-6xl">Escuchar tambien es leer el territorio</h2>
              <p className="mt-6 text-pretty text-base leading-8 text-[#445148]">
                Guardé la conversación en dos audios porque la entrevista fue larga y llena de detalles. Al escucharla, las fechas dejaron de sonar lejanas y empezaron a conectarse con lugares que conozco.
              </p>
              <div className="mt-7 grid gap-3 rounded-[1.5rem] border border-[#111713]/10 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <Mic2 className="mt-1 h-5 w-5 shrink-0 text-[#0f5d66]" aria-hidden="true" />
                  <p className="text-sm leading-7 text-[#445148]">
                    <span className="font-black text-[#111713]">Entrevistado:</span> {interviewInfo.interviewee}
                  </p>
                </div>
                <div className="flex gap-3">
                  <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[#b14f2b]" aria-hidden="true" />
                  <p className="text-sm leading-7 text-[#445148]">
                    <span className="font-black text-[#111713]">Entrevistadora:</span> {interviewInfo.interviewer}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {audioItems.map((audio, index) => (
                <article key={audio.src} className="audio-card reveal-up story-shadow rounded-[1.75rem] border border-[#111713]/10 bg-white p-6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0f5d66] text-white">
                      <Mic2 className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b14f2b]">Registro {index + 1}</p>
                      <h3 className="mt-2 break-words text-2xl font-black">{audio.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#4d5a51]">{audio.detail}</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl border border-[#111713]/10 bg-[#f7f4ed] p-4">
                    <audio controls preload="metadata" src={audio.src}>
                      Tu navegador no puede reproducir este audio.
                    </audio>
                  </div>
                  <a
                    href={audio.transcript}
                    download
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#111713]/12 px-4 py-3 text-sm font-black text-[#111713] transition hover:border-[#0f5d66] hover:text-[#0f5d66]"
                  >
                    <Archive className="h-4 w-4" aria-hidden="true" />
                    Leer texto del audio
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="foro" className="bg-[#efe6d3] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Foro abierto" title="Un espacio para responder al relato">
            También quiero leer otras memorias. Tal vez alguien conoce otra fecha, otra anécdota familiar, otro símbolo o una forma distinta de recordar Guayaramerín.
          </SectionHeader>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <form onSubmit={submitComment} className="story-shadow rounded-[2rem] border border-[#111713]/10 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b14f2b] text-white">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0f5d66]">Participa</p>
                  <h3 className="text-2xl font-black">Deja tu comentario</h3>
                </div>
              </div>

              <label className="mt-8 block">
                <span className="text-sm font-bold text-[#445148]">Nombre</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-[#111713]/12 bg-[#f7f4ed] px-4 py-4 text-[#111713] outline-none transition focus:border-[#0f5d66] focus:ring-4 focus:ring-[#0f5d66]/15"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-sm font-bold text-[#445148]">Comentario</span>
                <textarea
                  value={form.body}
                  onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                  className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-[#111713]/12 bg-[#f7f4ed] px-4 py-4 text-[#111713] outline-none transition focus:border-[#0f5d66] focus:ring-4 focus:ring-[#0f5d66]/15"
                  placeholder="¿Qué fecha, símbolo o recuerdo de Guayaramerín agregarías?"
                />
              </label>

              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111713] px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#0f5d66]">
                <Send className="h-5 w-5" aria-hidden="true" />
                Publicar en el foro
              </button>
            </form>

            <div className="grid content-start gap-4">
              {comments.map((comment, index) => (
                <article key={`${comment.name}-${comment.body}-${index}`} className="reveal-up rounded-[1.5rem] border border-[#111713]/10 bg-white/80 p-6 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-black">{comment.name}</h4>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-[#b14f2b]">{comment.tag}</p>
                    </div>
                    <MessageCircle className="h-5 w-5 text-[#0f5d66]" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-pretty text-sm leading-7 text-[#4d5a51]">{comment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111713] px-5 py-12 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d79b35]">Memoria local</p>
            <p className="mt-2 text-2xl font-black">Guayaramerín en mi voz</p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/64">
            Autora: Evelin Gutierrez Duran. Universidad Autónoma del Beni, carrera de Comunicación Social, cuarto semestre.
          </p>
        </div>
      </footer>

      <Transition appear show={selectedPhoto !== null} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedPhoto(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#111713]/82 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                {selectedPhoto ? (
                  <DialogPanel className="story-shadow w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#f7f4ed] text-[#111713]">
                    <div className="relative aspect-[4/3] bg-[#111713] sm:aspect-[16/10]">
                      <LocalImage item={selectedPhoto} className="object-contain" />
                      <button
                        type="button"
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111713] shadow-lg transition hover:rotate-6 hover:bg-[#d79b35]"
                        aria-label="Cerrar foto"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b14f2b]">Galería de fotos</p>
                      <DialogTitle className="mt-3 text-3xl font-black md:text-4xl">{selectedPhoto.title}</DialogTitle>
                      <p className="mt-4 max-w-3xl text-pretty text-base leading-8 text-[#445148]">{selectedPhoto.caption}</p>
                    </div>
                  </DialogPanel>
                ) : (
                  <span />
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#111713]/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-5">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 scale-95"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 scale-100"
                leaveTo="opacity-0 translate-y-4 scale-95"
              >
                <DialogPanel className="story-shadow w-full max-w-2xl rounded-[2rem] bg-[#f7f4ed] p-6 text-[#111713] md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b14f2b]">Detrás del relato</p>
                      <DialogTitle className="mt-3 text-balance text-3xl font-black md:text-4xl">
                        Cómo nació este relato
                      </DialogTitle>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111713] text-white transition hover:rotate-6 hover:bg-[#b14f2b]"
                      aria-label="Cerrar"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-6 text-pretty text-base leading-8 text-[#445148]">
                    Esta página nació después de escuchar al Dr. Prof. Jesús Suárez Chimanacay. Yo no quería que la entrevista quedara como un audio guardado, sino como una forma de contar mi ciudad desde lo que veo, escucho y recuerdo.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {["Escuchar", "Recordar", "Mirar", "Compartir"].map((item) => (
                      <div key={item} className="rounded-2xl border border-[#111713]/10 bg-white p-4">
                        <p className="font-black">{item}</p>
                      </div>
                    ))}
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
