import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

// Applied only while the homepage is mounted; learning-page layout stays intact.
const HomepageGlobals = createGlobalStyle`
  body { display: block; }
  #root { width: 100%; }
`;

const Page = styled.main`
  width: 100%;
  min-height: 100svh;
  padding: 32px clamp(20px, 5vw, 80px) 24px;
  background: #1c1c1a;
  color: #f4f0e7;
  font-family: Inter, "Segoe UI", "Microsoft JhengHei", sans-serif;
  color-scheme: dark;
`;

const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const Masthead = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ffffff20;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.16em;
`;

const BrandMark = styled.span`
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 25px;
  span {
    width: 5px;
    height: 25px;
    border-radius: 2px;
    background: #e5d374;
  }
  span:nth-child(2) { height: 17px; }
  span:nth-child(3) { height: 21px; }
`;

const MastheadNote = styled.span`
  color: #a8a69e;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-align: right;
  @media (max-width: 480px) { font-size: 9px; letter-spacing: 0.08em; }
`;

const Introduction = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 56px 0 40px;
  @media (max-width: 700px) {
    display: block;
    padding: 36px 0 28px;
  }
`;

const Eyebrow = styled.p`
  margin-bottom: 16px;
  color: #d9c979;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: clamp(34px, 4.8vw, 58px);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.045em;
  em { color: #e5d374; font-style: normal; }
`;

const IntroductionText = styled.p`
  max-width: 280px;
  padding-bottom: 5px;
  color: #aaa89f;
  font-size: 14px;
  line-height: 1.9;
  @media (max-width: 700px) { margin-top: 20px; max-width: none; }
`;

const Portals = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 16px; }
`;

const Portal = styled(Link)`
  --portal-ink: ${({ $dark }) => $dark ? "#f1ebfa" : "#292923"};
  --portal-muted: ${({ $dark }) => $dark ? "#c4b7d0" : "#6c6b5c"};
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: clamp(24px, 3vw, 36px);
  border: 1px solid ${({ $dark }) => $dark ? "#766184" : "#e3dca5"};
  border-radius: 20px;
  background: ${({ $dark }) => $dark ? "linear-gradient(145deg, #4d3d5b, #302638)" : "linear-gradient(140deg, #f1edcf, #d8cf91)"};
  color: var(--portal-ink);
  text-decoration: none;
  &:hover { color: var(--portal-ink); border-color: #f4df7c; }
  &:focus-visible { outline: 3px solid #fde047; outline-offset: 5px; }
`;

const PortalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  color: var(--portal-muted);
  font-size: 10px;
  letter-spacing: 0.18em;
`;

const PortalNumber = styled.span`
  font-size: 12px;
  letter-spacing: 0;
`;

const PortalTitle = styled.h2`
  margin: 0 0 8px;
  font-size: clamp(28px, 3.2vw, 38px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.045em;
`;

const PortalDescription = styled.p`
  min-height: 3.6em;
  color: var(--portal-muted);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.8;
`;

const Instrument = styled.div`
  position: relative;
  margin: 28px 0;
  padding: 12px 10px 10px;
  border-radius: 10px;
  background: #292726;
  box-shadow: 0 8px 16px #17161325, inset 0 1px 0 #ffffff20;
  pointer-events: none;
`;

const Keybed = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 3px;
`;

const WhiteKey = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 112px;
  padding-bottom: 12px;
  border-radius: 2px 2px 5px 5px;
  background: ${({ $selected }) => $selected ? "linear-gradient(#f4e28a, #e4cb54)" : "linear-gradient(#d7d3c8, #f8f6ed 65%)"};
  box-shadow: inset 0 -4px 0 #00000020;
  color: ${({ $selected }) => $selected ? "#68448b" : "#8c887b"};
  font-size: 10px;
  font-weight: 500;
`;

const BlackKey = styled.span`
  position: absolute;
  top: 0;
  left: ${({ $position }) => `calc(${$position * 12.5}% - 10px)`};
  width: 20px;
  height: 68px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(100deg, #4a4744, #171615 70%);
  box-shadow: 2px 3px 3px #00000045, inset 0 -4px 0 #00000070;
`;

const PortalBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid ${({ $dark }) => $dark ? "#ffffff25" : "#29292325"};
  font-size: 13px;
`;

const Arrow = styled.span`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 19px;
  line-height: 1;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  color: #8c8a82;
  font-size: 10px;
  line-height: 1.7;
  letter-spacing: 0.04em;
`;

function PianoIllustration({ chord = false }) {
  const names = ["C", "D", "E", "F", "G", "A", "B", "C"];
  return (
    <Instrument aria-hidden="true">
      <Keybed>
        {names.map((name, index) => (
          <WhiteKey key={index} $selected={chord ? [0, 2, 4].includes(index) : index === 2}>
            {name}
          </WhiteKey>
        ))}
        {[1, 2, 4, 5, 6].map((position) => (
          <BlackKey key={position} $position={position} />
        ))}
      </Keybed>
    </Instrument>
  );
}

export default function Homepage() {
  return (
    <Page data-homepage>
      <HomepageGlobals />
      <Content>
        <Masthead>
          <Brand>
            <BrandMark aria-hidden="true"><span /><span /><span /></BrandMark>
            TONE
          </Brand>
          <MastheadNote>PIANO & MUSIC THEORY</MastheadNote>
        </Masthead>
        <Introduction>
          <div>
            <Eyebrow>PLAY. LISTEN. UNDERSTAND.</Eyebrow>
            <Heading>讓樂理，<br />在<em>指尖</em>發生。</Heading>
          </div>
          <IntroductionText>
            從音階的起伏，到和弦的共鳴。<br />
            選擇一個起點，用耳朵與雙手探索音樂。
          </IntroductionText>
        </Introduction>
        <Portals aria-label="選擇練習內容">
          <Portal to="/pianoscales" aria-labelledby="scales-title">
            <PortalTop><span>音階探索 · MELODY</span><PortalNumber>01</PortalNumber></PortalTop>
            <PortalTitle id="scales-title">Piano Scales</PortalTitle>
            <PortalDescription>認識音階、聆聽音高，在五線譜上找到每一個音。</PortalDescription>
            <PianoIllustration />
            <PortalBottom><span>開始音階練習</span><Arrow aria-hidden="true">↗</Arrow></PortalBottom>
          </Portal>
          <Portal to="/pianochords" $dark aria-labelledby="chords-title">
            <PortalTop><span>和弦探索 · HARMONY</span><PortalNumber>02</PortalNumber></PortalTop>
            <PortalTitle id="chords-title">Chords</PortalTitle>
            <PortalDescription>從三和弦到七和弦，聽見不同音符交織的色彩。</PortalDescription>
            <PianoIllustration chord />
            <PortalBottom $dark><span>開始和弦練習</span><Arrow aria-hidden="true">↗</Arrow></PortalBottom>
          </Portal>
        </Portals>
        <Footer><span>一台鋼琴，兩種探索方式。</span><span>TAKE YOUR TIME. FIND YOUR SOUND.</span></Footer>
      </Content>
    </Page>
  );
}
