import { Button } from "../ui/button";

export default function UploadForm(){
    return (
        <div><form className="flex flex-col gap-6">
                <input type="file" className=""/>
                <Button>Upload Your PDF</Button>
        </form>
        </div>
    )
}