import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <h1>Bolt Bucket 🏎️</h1>
        </li>
      </ul>

      <ul>
        <li>
          <a href="/" role="button">
            Customize
          </a>
        </li>
        <li>
          <a href="/customcars" role="button">
            View Cars
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
