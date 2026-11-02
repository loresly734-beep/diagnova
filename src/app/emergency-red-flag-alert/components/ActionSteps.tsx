import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const doList = [
  { id: 'do-1', text: 'Llama a emergencias ahora, no esperes a que mejore.' },
  { id: 'do-2', text: 'Siéntate o recuéstate en una posición cómoda y mantén la calma.' },
  { id: 'do-3', text: 'Afloja la ropa ajustada en cuello, pecho y cintura.' },
  { id: 'do-4', text: 'Pide a alguien que te acompañe y abra la puerta a los paramédicos.' },
  { id: 'do-5', text: 'Si hay sangrado, presiona firmemente con un paño limpio.' },
];

const dontList = [
  { id: 'dont-1', text: 'No conduzcas ni vayas solo al hospital.' },
  { id: 'dont-2', text: 'No comas ni bebas hasta ser valorado.' },
  { id: 'dont-3', text: 'No tomes medicación nueva por tu cuenta.' },
  { id: 'dont-4', text: 'No te quedes solo; avisa a un familiar o vecino.' },
];

export default function ActionSteps() {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      <section className="rounded-3xl bg-destructive-foreground/10 p-6 border border-destructive-foreground/20">
        <h2 className="text-lg font-extrabold mb-4">Qué hacer ahora</h2>
        <ul className="flex flex-col gap-3">
          {doList?.map((d, i) => (
            <li key={d?.id} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-destructive-foreground text-destructive flex items-center justify-center text-sm font-extrabold shrink-0 tabular">
                {i + 1}
              </span>
              <span className="text-sm font-semibold pt-1">{d?.text}</span>
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-1.5 ml-auto opacity-0" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-3xl bg-destructive-foreground/10 p-6 border border-destructive-foreground/20">
        <h2 className="text-lg font-extrabold mb-4">Qué NO hacer</h2>
        <ul className="flex flex-col gap-3">
          {dontList?.map((d) => (
            <li key={d?.id} className="flex items-start gap-3">
              <XCircle className="w-6 h-6 shrink-0" />
              <span className="text-sm font-semibold pt-0.5">{d?.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}