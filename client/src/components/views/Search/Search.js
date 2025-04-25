import SearchForm from "../../features/SearchForm/SearchForm"

const Search = () => {
    return(
        <div>
            <div className="text-center text-uppercase fw-bold">Search ad by title:</div>
            <SearchForm />
        </div>
    );
}

export default Search;