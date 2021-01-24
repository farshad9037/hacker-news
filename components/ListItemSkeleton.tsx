import styled from "styled-components";

const ListItemSkeleton = styled.div`
  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }

  height: 100px;
  margin: -16px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #e8e8e8 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

export default ListItemSkeleton;
