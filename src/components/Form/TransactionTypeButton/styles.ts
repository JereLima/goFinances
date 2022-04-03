import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface IconsProps {
  type: "up" | "down";
  isActive: boolean;
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

interface TitleProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}

    border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-color: ${({ theme }) => theme.colors.text};

  width: 48%;
  border-radius: 5px;
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 14px;
`;

export const Icon = styled(Feather)<IconsProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.shape : theme.colors.text};
`;
export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.shape : theme.colors.text};
`;
