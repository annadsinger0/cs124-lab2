import './App.css';

function SortBy(props) {

    function handleChangeSort(e) {
        props.onChangeSort(e.target.value)
    }

    return (
        <div id={"sort-by"}>
            <label htmlFor="sort">Sort by:</label>
            <select name="sort" id="sort" onChange={handleChangeSort}>
                <option value="CreatedSort">Created</option>
                <option value="NameSort">Alphabetical</option>
                {props.itemType === "task" &&
                    <>
                    <option value="CompletedSort">Completed</option>
                    <option value="PrioritySort">Priority</option>
                    </>
                }
            </select>
        </div>
    );
}

export default SortBy;
