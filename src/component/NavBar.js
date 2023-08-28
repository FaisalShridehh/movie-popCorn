import  Search  from "./Search";
import  Logo  from "./Logo";

export default function NavBar({query,setQuery, children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      {children}
    </nav>
  );
}
