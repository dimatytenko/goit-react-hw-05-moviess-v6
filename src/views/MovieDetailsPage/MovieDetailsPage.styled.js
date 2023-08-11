import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const MoviePageContainer = styled.div`
  padding: 50px 0;
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &: hover,
  &: focus {
    color: #2196f3;
  }
`;

export const StyledNavLink = styled(NavLink)`
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &: hover,
  &: focus {
    color: #2196f3;
  }
`;

export const StyledLinkWrapper = styled.ul`
  display: flex;
  gap: 20px;
`;

export const MovieDetailsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  flex: 0 0 300px;
`;
