import './App.css';

function SortBy(props) {

    function handleChangeSort(e) {
        props.onChangeSort(e.target.value)
    }

    return (
        <div id={"sort-by"}>
            <label htmlFor="sort">sort by:</label>
            <select name="sort" id="sort" onChange={handleChangeSort}>
                <option value="SortByCreated">created</option>
                <option value="SortByName">alphabetical</option>
                {props.itemType === "task" &&
                    <>
                    <option value="SortByCompleted">completed</option>
                    <option value="SortByPriority">priority</option>
                    </>
                }
            </select>
        </div>
    );
}

export default SortBy;
