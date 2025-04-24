import SearchForm from "../../features/SearchForm/SearchForm"

const Search = () => {
    return(
        <div className="mt-5">
            <div className="text-center text-uppercase fw-bold">Search ad by title:</div>
            <SearchForm />
        </div>
    );
}

export default Search;