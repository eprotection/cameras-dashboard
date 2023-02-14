import Dialog from "../Dialog"

const FiltersDialog=({hide})=>{


    return <Dialog title="Image filters">
        

        <div className="bar">
            <span className="btn clk" onClick={hide}>Close</span>
        </div>

    </Dialog>
}
export default FiltersDialog