import styled, { css } from "styled-components";

export const LearningPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const PageTitle = styled.h1`
  margin-bottom: 2.25rem;
`;

export const HomeItem = styled.div`
  background-color: oklch(87.9% 0.169 91.605);
  color: oklch(62.7% 0.265 303.9);
`;

export const Controls = styled.div`
  margin-bottom: 2.25rem;
`;

export const ScaleSelect = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 0.25rem;
  background-color: oklch(85.2% 0.199 91.936);
  color: oklch(43.8% 0.218 303.724);
`;

export const KeyboardScrollArea = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding-block: 24px;
  overscroll-behavior-x: contain;

  &:focus-visible {
    outline: 2px solid #7c3aed;
    outline-offset: -2px;
  }
`;

export const Keyboard = styled.div`
  position: relative;
  display: flex;
  width: max-content;
  min-width: 100%;
  height: 192px;
  justify-content: center;
`;

export const KeySlot = styled.div`
  position: relative;
  flex: 0 0 ${({ $black }) => ($black ? "0px" : "68px")};
  width: ${({ $black }) => ($black ? "0px" : "68px")};
`;

const blackKeyFeedback = css`
  --key-face-width: 46px;
  --key-face-height: 132.99px;
  --black-front-width: 38px;
  --black-front-height: 120.991px;
  --black-front-border: ${({ $wrong }) => ($wrong ? "transparent" : "#DBCC80")};
  --black-front-background: ${({ $wrong }) =>
    $wrong
      ? "linear-gradient(174deg, #CB5D5D 0%, #971F1F 99.92%)"
      : "linear-gradient(174deg, rgba(221, 203, 111, 0.7) 0%, rgba(240, 213, 73, 0.7) 99.92%)"};
  --black-side-width: 8px;
  --black-side-height: 129.181px;
  --black-side-background: ${({ $wrong }) =>
    $wrong
      ? "linear-gradient(90deg, #C35757 0%, #971F1F 100%)"
      : "linear-gradient(135deg, #F7E16F 27.22%, #F0D549 77.18%)"};
  --black-bottom-width: 43.748px;
  --black-bottom-height: 11.999px;
  --black-bottom-left: 1.126px;
  --black-bottom-border: transparent;
  --black-bottom-background: ${({ $wrong }) =>
    $wrong
      ? "linear-gradient(93deg, #B64949 -0.57%, #971F1F 106.1%)"
      : "linear-gradient(94deg, #F0DB6E 0%, #F0D549 100.54%)"};
  --black-reflection-display: none;
  --key-face-background: ${({ $wrong }) =>
    $wrong
      ? "var(--black-key-error, #991B1B)"
      : "var(--black-key-correct, linear-gradient(173deg, #FDE047 0%, #D6BE3D 100%))"};
  --key-face-glow: ${({ $wrong }) =>
    $wrong
      ? "0 0 40px 0 rgba(153, 27, 27, 0.5)"
      : "0 0 40px 0 rgba(253, 224, 71, 0.5)"};
  color: ${({ $wrong }) =>
    $wrong
      ? "var(--black-key-text-error, #D69E2E)"
      : "var(--black-key-text-correct, #7C3AED)"};

  > [data-key-label] {
    font-size: 10px;
    width: 23px;
    height: 52.996px;
    white-space: pre;
  }
`;

// Keep the hit area fixed; only the white key's decorative surface contracts.
const whiteKeyFeedback = css`
  --key-face-width: 64.6px;
  --key-face-height: 182.4px;
  --key-glass-height: 150.1px;
  --key-face-background: ${({ $wrong }) =>
    $wrong
      ? "var(--white-key-error, #991B1B)"
      : "var(--white-key-correct, #FDE047)"};
  --key-face-glow: ${({ $wrong }) =>
    $wrong
      ? "0 0 40px 0 rgba(153, 27, 27, 0.5)"
      : "0 0 40px 0 rgba(253, 224, 71, 0.5)"};
  --key-gradient-radius: ${({ $wrong }) => ($wrong ? "15px" : "10px")};
  background: transparent;
  transform: none;
  color: ${({ $wrong }) =>
    $wrong
      ? "var(--white-key-text-error, #D69E2E)"
      : "var(--white-key-text-correct, #7C3AED)"};

  > [data-key-label] {
    font-size: 10px;
    width: 34px;
    height: 14px;
  }
`;
// Shared piano hit area and state feedback.
export const PianoKey = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  padding: 0;

  /* z-index 層級控制 */
  z-index: ${({ $black, $chords }) => ($black ? ($chords ? 5 : 20) : 1)};
  margin: 0;
  left: ${({ $black }) => ($black ? "-24px" : "0")};

  width: ${({ $black }) => ($black ? "48px" : "68px")};
  height: ${({ $black }) => ($black ? "140px" : "192px")};
  border-radius: ${({ $black }) => ($black ? "10px" : "15px")};
  background: transparent;
  --key-default-height: ${({ $black }) => ($black ? "140px" : "192px")};
  color: ${({ $black }) =>
    $black
      ? "var(--black-key-text-default, #fff)"
      : "var(--white-key-text-default, #6b21a8)"};
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;

  /* The layered face stays visible for both pointer and chord playback states. */
  ${({ $active, $black }) =>
    $active && ($black ? blackKeyFeedback : whiteKeyFeedback)}

  &:active {
    ${({ $black }) => ($black ? blackKeyFeedback : whiteKeyFeedback)}
  }
`;

export const StaffPanel = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

export const ChordSection = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ChordTitle = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  line-height: calc(1.75 / 1.25);
  font-weight: 700;
  color: oklch(49.6% 0.265 301.924);
`;

export const ChordList = styled.div`
  max-width: 100%;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

// Keep the hit area fixed so pressing a chord does not move adjacent buttons.
export const ChordButton = styled.button`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 60px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #2563eb;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    width: 96px;
    height: 60px;
    border-radius: 10px;
    background: linear-gradient(111deg, #ded99c 0%, #dad170 100%);
    box-shadow: -7px -5px 4px 0 rgba(95, 100, 63, 0.25) inset;
    pointer-events: none;
  }

  &:active {
    color: #9333ea;
  }

  &:active::before {
    width: 92px;
    height: 57px;
    background: linear-gradient(111deg, #fde047 0%, #dcbf28 100%);
    box-shadow: -4px -2px 4px 0 rgba(95, 100, 63, 0.25) inset;
  }

  &:active > [data-chord-face] {
    width: 87px;
  }
`;

export const ChordButtonFace = styled.span.attrs({
  "data-chord-face": true,
  "aria-hidden": true,
})`
  position: absolute;
  width: 89px;
  height: 55px;
  border-radius: 10px 0 0 0;
  pointer-events: none;
`;

export const ChordButtonLabel = styled.span`
  position: relative;
  white-space: nowrap;
  pointer-events: none;
`;

export const Divider = styled.div`
  width: 100%;
  margin-block: 1rem;
`;

export const KeyLabel = styled.span.attrs({ "data-key-label": true })`
  position: absolute;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  white-space: ${({ $black }) => ($black ? "pre" : "nowrap")};
  pointer-events: none;
`;
