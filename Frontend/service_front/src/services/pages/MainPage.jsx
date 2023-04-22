import {Link} from "react-router-dom";

function MainPage() {

    return (
        <div className="my-container text-center">
            <h1 className="p-0 mt-4 mb-1 titel_one fs-1">Играй в 12/10.</h1>
            <h5 className="p-0 mb-4 titel_two">Идеальное место для уничтожения времени!</h5>
            <Link className="btn my-btn mb-5" to="/game">ИГРАТЬ!!!</Link>
            <br />
            <img src="mpi.jpg" style={{width: "90%"}} alt=""/>
            <h1 className="titel_one fs-2">Почему наша игра?</h1>
            <div className="d-flex justify-content-between">
                <div className="info-banner-item">
                    <img src="card-image/1.png" alt=""/>
                    <h2>Это бесплатно</h2>
                    <h3>Просто создайте аккаунт и начните играть — никаких подписок и платежей.</h3>
                </div>
                <div className="info-banner-item">
                    <img src="card-image/2.png" alt=""/>
                    <h2>Новые друзья</h2>
                    <h3>Находите интересных вам игроков и добавляйте их в друзья. Делитесь своими достижениями и следите за интересующими вас игроками</h3>
                </div>
                <div className="info-banner-item">
                    <img src="card-image/3.png" alt=""/>
                    <h2>Играйте где угодно</h2>
                    <h3>Вы можете играть на любом устройстве, где есть браузер — хоть на компьютере из дома, хоть на телефоне, пока едете в метро.</h3>
                </div>
            </div>
        </div>
    )
}

export default MainPage