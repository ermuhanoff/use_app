// import "rsuite/dist/styles/rsuite-default.min.css";
// import "rsuite/dist/styles/rsuite-dark.min.css";
import 'rsuite/lib/styles/themes/dark/index.less';
import "./App.less";
import { Button, Panel, Placeholder } from "rsuite";

function App() {
  return (
    <div className="App">
      <Panel
        // shaded
        bordered
        style={{ display: "inline-block", width: 240 }}
      >
        <img src="" alt="Card intro" height="240" />
        <Panel header="RSUITE">
          <p>
            <small>
              A suite of React components, sensible UI design, and a friendly
              development experience.
            </small>
          </p>
        </Panel>
        <Button appearance="primary"  >Button</Button>
      </Panel>
    </div>
  );
}

export default App;
