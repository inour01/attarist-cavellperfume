import type { Note } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface OlfactoryPyramidProps {
  topNotes: Note[];
  middleNotes: Note[];
  baseNotes: Note[];
}

export function OlfactoryPyramid({ topNotes, middleNotes, baseNotes }: OlfactoryPyramidProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="font-headline text-xl font-semibold">Olfactory Pyramid</h3>
      <div className="space-y-3">
        <NoteGroup title="Top Notes" notes={topNotes} />
        <NoteGroup title="Middle Notes" notes={middleNotes} />
        <NoteGroup title="Base Notes" notes={baseNotes} />
      </div>
    </div>
  );
}

function NoteGroup({ title, notes }: { title: string; notes: Note[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {notes.map((note) => (
          <Badge key={note} variant="secondary">
            {note}
          </Badge>
        ))}
      </div>
    </div>
  );
}
