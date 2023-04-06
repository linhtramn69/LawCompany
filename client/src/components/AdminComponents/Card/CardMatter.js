import { Col } from "antd";
import { Link } from "react-router-dom";

const styleCard = {
    backgroundColor: `var(--gold-light)`
}
const styleCard1 = {
    backgroundColor: `var(--grey-blue)`,
}
function CardMatter({ title, total, url }) {
    
    return (
        <Col md={{span: 8}} xs={{span: 8}}>
            <Link to={url}>
                <div className="card-matter" style={
                    total > 0 ? styleCard : styleCard1
                }>
                    <p>{total}</p>
                    <p>{title}</p>
                </div>
            </Link>
        </Col>
    );
}

export default CardMatter;