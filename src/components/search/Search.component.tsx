import "./Search.component.css";
import search_icon from "../../assets/imgs/icons/search_icon.png";

const Search = () => {
  return (
    <div className="searchContainer">
        <input type="search" />
        <button>
            <img src={search_icon} alt="search_button" />
        </button>
    </div>
  )
}

export default Search
