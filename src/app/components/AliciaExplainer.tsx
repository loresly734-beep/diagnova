import React from 'react';

const steps = [
  { id: 'alicia-a', letter: 'A', title: 'Antigüedad', body: 'Cuándo empezó y si fue súbito o progresivo.' },
  { id: 'alicia-l', letter: 'L', title: 'Localización', body: 'Dónde duele y si se irradia a otra zona.' },
  { id: 'alicia-i', letter: 'I', title: 'Intensidad', body: 'Escala EVA del 1 al 10.' },
  { id: 'alicia-c', letter: 'C', title: 'Carácter', body: 'Punzante, opresivo, ardor, sordo o cólico.' },
  { id: 'alicia-i2', letter: 'I', title: 'Irradiación y factores', body: 'Qué lo desencadena o lo alivia.' },
  { id: 'alicia-a2', letter: 'A', title: 'Acompañantes', body: 'Fiebre, náuseas, mareo y signos de alarma.' },
];

export default function AliciaExplainer() {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-xl font-extrabold text-foreground">Cómo funciona la anamnesis ALICIA</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Un cuestionario corto que se adapta a tus respuestas y se detiene si detecta una urgencia.
      </p>
      <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {steps?.map((s) => (
          <li key={s?.id} className="flex items-start gap-3 rounded-2xl bg-background border border-border p-4">
            <span className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-extrabold shrink-0">
              {s?.letter}
            </span>
            <div>
              <p className="text-sm font-extrabold text-foreground">{s?.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s?.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}