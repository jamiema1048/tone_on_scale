import styled from "styled-components";

// Decorative layers never intercept the piano button's mouse/touch events.
const Surface = styled.div.attrs({ "data-key-face": true, "aria-hidden": true })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $black }) => ($black ? "var(--key-face-width, 48px)" : "var(--key-face-width, 68px)")};
  height: ${({ $black }) => ($black ? "var(--key-face-height, 140px)" : "var(--key-face-height, 192px)")};
  flex-shrink: 0;
  border-radius: ${({ $black }) => ($black ? "10px" : "15px")};
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 -10px 4px 0 rgba(0, 0, 0, 0.25) inset;
  }
`;

const WhiteShape = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: var(--key-face-height, 192px);
  border-radius: 15px;
  background: var(--key-face-background, var(--white-key-default, linear-gradient(7deg, #fff 0%, #4e4949 100%)));
  box-shadow: var(--key-face-glow, none);
`;

const FrostedGlass = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--key-glass-height, 158px);
  border-radius: 15px 15px 0 0;
  filter: drop-shadow(5px 17px 122px rgba(111, 108, 108, 0.4));
`;

const WhiteGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--key-face-height, 192px);
  border-radius: var(--key-gradient-radius, 15px);
  background: var(--key-face-background, linear-gradient(7deg, #fff 0%, #4e4949 100%));
  box-shadow: var(--key-face-glow, none);
`;

const GlassShadow = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: var(--key-glass-height, 158px);
  border-radius: 15px 15px 0 0;
  background: rgba(111, 108, 108, 0.3);
  filter: drop-shadow(5px 17px 122px rgba(111, 108, 108, 0.4));
`;

const BlackBody = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: var(--key-face-background, var(--black-key-default, #000));
  box-shadow: var(--key-face-glow, none);
`;

const BlackFront = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--black-front-width, 41px);
  height: var(--black-front-height, 127px);
  border-radius: 10px 0 0 0;
  border: 1px solid var(--black-front-border, #31312d);
  background: var(--black-front-background, linear-gradient(174deg, rgba(76, 76, 70, 0.7) 0%, rgba(0, 0, 0, 0.7) 99.06%));
`;

// Intersect the right/bottom rectangles with the rounded 48 × 140 key outline.
const BlackIntersections = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 10px;
  overflow: hidden;
`;

const BlackSide = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: var(--black-side-width, 7px);
  height: var(--black-side-height, 135.715px);
  background: var(--black-side-background, linear-gradient(90deg, #2a2a25 0%, #000 100%));
`;

const BlackBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: var(--black-bottom-left, 1.046px);
  width: var(--black-bottom-width, 45.908px);
  height: var(--black-bottom-height, 13px);
  border: 1px solid var(--black-bottom-border, #333131);
  background: var(--black-bottom-background, linear-gradient(93deg, rgba(51, 49, 49, 0.83) 7.2%, rgba(52, 52, 52, 0.83) 91.7%));
`;

const BlackBottomReflection = styled.div`
  display: var(--black-reflection-display, block);
  position: absolute;
  inset: 0;
  border: 1px solid #383636;
  background: linear-gradient(180deg, rgba(184, 177, 177, 0.5) 0%, rgba(63, 61, 61, 0.5) 100%);
`;

export default function PianoKeyFace({ black }) {
  return (
    <Surface $black={black}>
      {black ? (
        <>
          <BlackBody>
            <BlackFront />
          </BlackBody>
          <BlackIntersections>
            <BlackSide />
            <BlackBottom>
              <BlackBottomReflection />
            </BlackBottom>
          </BlackIntersections>
        </>
      ) : (
        <>
          <WhiteShape />
          <FrostedGlass>
            <WhiteGradient />
            <GlassShadow />
          </FrostedGlass>
        </>
      )}
    </Surface>
  );
}


