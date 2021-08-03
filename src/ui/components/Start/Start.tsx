import Styles from "./Start.module.less";
import { Button, Container, Icon } from "rsuite";
import { CSSProperties } from "react";

const fontSize: CSSProperties = { fontSize: "1.5rem" };
const button: CSSProperties = {
  ...fontSize,
  height: 60,
  marginBottom: "1rem",
};

function Start() {
  return (
    <div className={Styles.Start}>
      <Container>
        <Button color="blue" style={button}>
          <Icon icon="file-upload" style={fontSize} /> Send
        </Button>
        <Button color="blue" style={button}>
          <Icon icon="file-download" style={fontSize} /> Get
        </Button>
      </Container>
    </div>
  );
}

export default Start;
