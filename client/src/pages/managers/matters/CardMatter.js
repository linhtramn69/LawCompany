import { Col } from "antd";

const styleCard = {
    backgroundColor: `var(--gold-light)`
}
const styleCard1 = {
    backgroundColor: `var(--grey-blue)`,
}
function CardMatter({ title, total }) {
    console.log(total);
    return (
        <Col md={{span: 8}} xs={{span: 8}}>
            <div className="card-matter" style={
                total > 0 ? styleCard : styleCard1
            }>
                <p>{total}</p>
                <p>{title}</p>
            </div>
        </Col>
    );
}

export default CardMatter;