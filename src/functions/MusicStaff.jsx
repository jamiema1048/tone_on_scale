// MusicStaff.jsx
import { useEffect, useRef } from "react";
import Vex from "vexflow";
import { spellStaffNote } from "./staffNotes";

export default function MusicStaff({ note, rootNote, scale }) {
  const containerRef = useRef(null);
  const staffNote = spellStaffNote(note, rootNote, scale);

  useEffect(() => {
    if (!containerRef.current) return;

    // 清空畫面
    containerRef.current.innerHTML = "";

    const VF = Vex.Flow;

    // 建立 Renderer
    const renderer = new VF.Renderer(
      containerRef.current,
      VF.Renderer.Backends.SVG
    );
    renderer.resize(350, 160);
    const context = renderer.getContext();

    // 五線譜
    const stave = new VF.Stave(10, 20, 330);
    stave.addClef("treble").setContext(context).draw();

    if (staffNote) {
      const [, letter, accidental, octave] = staffNote.match(/^([A-G])([#b]*)(-?\d+)$/);
      const vfKey = `${letter.toLowerCase()}${accidental}/${octave}`;
      const staveNote = new VF.StaveNote({
        keys: [vfKey],
        duration: "q",
        clef: "treble",
      });

      if (accidental) {
        staveNote.addModifier(0, new VF.Accidental(accidental));
      }

      // ✨ 讓 VexFlow 自動排版（避免 UI 崩潰）
      VF.Formatter.FormatAndDraw(context, stave, [staveNote]);
    }
  }, [staffNote]);

  return <div ref={containerRef}></div>;
}
