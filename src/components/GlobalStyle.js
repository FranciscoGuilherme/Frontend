import styled from "styled-components"
import { ICON_COLOR, ICON_DEFAULT_RADIUS } from "~/UI/colors"

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
  color: white;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: ${ICON_DEFAULT_RADIUS};
  background-color: ${ICON_COLOR};
`