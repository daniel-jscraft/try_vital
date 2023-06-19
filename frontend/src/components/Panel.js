import AppService from "../etc/AppService"

export default function Panel ({data}) {
    return(<div>
        {data.name}
        <u>
            {data.markersIds.map(
                (mId,i) => <li key={i}>{AppService.getMarkerName(mId)}</li>
            )}
        </u>
    </div>)
}