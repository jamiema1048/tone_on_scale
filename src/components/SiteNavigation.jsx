import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  padding: 1rem;
`;

const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const NavigationLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  background: #fde047;
  color: #6b21a8;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #facc15;
    color: #6b21a8;
  }

  &:focus-visible {
    outline: 2px solid #7c3aed;
    outline-offset: 3px;
  }
`;

const destinations = [
  { to: "/", label: "首頁" },
  { to: "/pianoscales", label: "Piano Scales" },
  { to: "/pianochords", label: "Chords" },
];

export default function SiteNavigation() {
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, "") || "/";

  // The homepage already provides its two learning-page entry links.
  if (currentPath === "/") return null;

  return (
    <Header>
      <Navigation aria-label="頁面導覽">
        {destinations
          .filter(({ to }) => to !== currentPath)
          .map(({ to, label }) => (
            <NavigationLink key={to} to={to}>
              {label}
            </NavigationLink>
          ))}
      </Navigation>
    </Header>
  );
}
