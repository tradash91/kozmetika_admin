import { Link, Outlet } from "react-router";
import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/apiAuth";
const StyledDashboardNav = styled.nav`
  ${flex("row")}
  gap: 5rem;
  font-size: 18px;
  font-weight: 400;
  background-color: var(--blue-600);
  color: var(--neutral-0);
  padding: 1rem 3rem;

  a {
    &:hover {
      transform: scale(1.1);
    }
  }
`;
function DashBoard() {
  const { mutate } = useMutation({
    mutationFn: logout,
  });
  return (
    <div>
      <nav>
        <StyledDashboardNav>
          <Link to={"settings"}>Beállítások</Link>
          <Link to={"blog"}>Blog</Link>
          <Link to={"services"}>Szolgáltatások</Link>
          <Link to={"giftcard"}>Ajándék kártyák</Link>
          <Link
            style={{
              padding: "0 1rem",
              backgroundColor: "var(--neutral-0)",
              color: "var(--red-700)",
              marginLeft: "auto",
            }}
            onClick={() => {
              mutate();
            }}
            to={"/"}
          >
            Kijelentkezés
          </Link>
        </StyledDashboardNav>
      </nav>
      <Outlet />
    </div>
  );
}

export default DashBoard;
