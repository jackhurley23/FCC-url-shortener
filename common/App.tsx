import * as React from "react";
import { hot } from "react-hot-loader";

/* tslint:disable-next-line */
import "regenerator-runtime/runtime";

interface IAppStyles {
  container: React.CSSProperties;
  background: React.CSSProperties;
  cardWrapper: React.CSSProperties;
  input: React.CSSProperties;
  header: React.CSSProperties;
  goBack: React.CSSProperties;
  url: React.CSSProperties;
}

const styles: IAppStyles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  background: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    background: "url(https://source.unsplash.com/random/800x600)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    zIndex: -1,
    filter: "sepia(0.9)"
  },
  cardWrapper: {
    minWidth: "515px",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    borderRadius: "2px",
    position: "relative",
    padding: "3rem",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
  },
  input: {
    width: "400px",
    padding: 8,
    background: "transparent",
    fontSize: "16px",
    border: "solid 1px #ccc"
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem"
  },
  goBack: {
    cursor: "pointer",
    padding: 8,
    position: "absolute",
    top: 0,
    left: 0
  },
  url: {}
};

export interface IAppState {
  activeLink: string;
  errors: string;
}

export interface IURLFormInput extends HTMLFormElement {
  url: HTMLInputElement;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeLink: "",
      errors: ""
    };
    this.submitLink = this.submitLink.bind(this);
  }

  public submitLink = async (e: any) => {
    e.preventDefault();
    const data = { url: e.target.url.value };
    const json = await fetch("/api/shorturl/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const result = await json.json();
    if (result.error) {
      this.setState({
        errors: result.error
      });
    } else if (result.short_url) {
      this.setState({
        activeLink: `${location.origin}/api/shorturl/${result.short_url}`
      });
    }
  };

  public goBack = () => {
    this.setState({
      activeLink: "",
      errors: ""
    });
  };

  public render() {
    const { activeLink, errors } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.background} />
        {this.state.errors !== "" ? (
          <Errors errors={errors} goBack={this.goBack} />
        ) : this.state.activeLink === "" ? (
          <InputField onSubmit={this.submitLink} />
        ) : (
          <URLResult url={activeLink} goBack={this.goBack} />
        )}
      </div>
    );
  }
}

export { App };
export default hot(module)(App);

export interface IInputFieldProps {
  onSubmit(e: any): void;
}

const InputField = (props: IInputFieldProps) => (
  <div style={styles.cardWrapper}>
    <h1 style={styles.header}>URL Shortener</h1>
    <form onSubmit={props.onSubmit}>
      <input
        name="url"
        placeholder="Paste your link here"
        style={styles.input}
      />
    </form>
  </div>
);

export interface IURLResultProps {
  url: string;
  goBack(): void;
}

const URLResult = (props: IURLResultProps) => (
  <div style={styles.cardWrapper}>
    <div style={styles.goBack} onClick={props.goBack}>
      &#8592; Go Back
    </div>
    <h1 style={styles.header}>Here is your URL</h1>
    <a style={styles.url} href={props.url}>
      {props.url}
    </a>
  </div>
);

export interface IErrorsProps {
  errors: string;
  goBack(): void;
}
export const Errors = (props: IErrorsProps) => (
  <div style={styles.cardWrapper}>
    <h1 style={styles.header}>Error</h1>
    <div style={styles.goBack} onClick={props.goBack}>
      &#8592; Go Back
    </div>Error: {props.errors}
  </div>
);
