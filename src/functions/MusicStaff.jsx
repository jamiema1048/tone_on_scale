// MusicStaff.jsx
import { useEffect, useRef } from "react";
import Vex from "vexflow";

export default function MusicStaff({ note }) {
  const containerRef = useRef(null);

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

    if (note) {
      // C4 → c/4
      const vfKey = note.toLowerCase().replace(/(\d)/, "/$1");

      const staveNote = new VF.StaveNote({
        keys: [vfKey],
        duration: "q",
        clef: "treble",
      });

      const pitch = note.slice(0, -1);
      if (pitch.includes("#")) {
        staveNote.addModifier(0, new VF.Accidental("#"));
      } else if (pitch.includes("b")) {
        staveNote.addModifier(0, new VF.Accidental("b"));
      }

      // ✨ 讓 VexFlow 自動排版（避免 UI 崩潰）
      VF.Formatter.FormatAndDraw(context, stave, [staveNote]);
    }
  }, [note]);

  return <div ref={containerRef}></div>;
}
