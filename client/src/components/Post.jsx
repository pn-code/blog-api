import { DateTime } from "luxon";

export default function Post(props) {
    const { title, text, date } = props;
    return (
        <div className="Post">
            <div className="post--header">
                <h4>{title}</h4>
                {/* <span>
                    { DateTime.fromJSDate(date).toLocaleString(
                        DateTime.DATE_MED
                    )}
                </span> */}
            </div>
            <p className="post--text">{text}</p>
        </div>
    );
}
