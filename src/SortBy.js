import './App.css';

function SortBy(props) {

    function handleChangeSort(e) {
        props.onChangeSort(e.target.value)
    }

    return (
        <div id={"sort-by"}>
            <label htmlFor="sort">Sort by:</label>
            <select name="sort" id="sort" onChange={handleChangeSort}>
                <option value="SortByCreated">Created</option>
                <option value="SortByName">Alphabetical</option>
                {props.itemType === "task" &&
                    <>
                    <option value="SortByCompleted">Completed</option>
                    <option value="SortByPriority">Priority</option>
                    </>
                }
            </select>
        </div>
    );
}

export default SortBy;
