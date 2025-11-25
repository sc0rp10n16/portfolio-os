import dayjs from "dayjs";
import {navIcons, navLinks} from "#constants";

const Navbar = () => {
    return (
        <nav className="rounded-full  m-2">
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Akshith's OS</p>
                <ul>
                    {navLinks.map(({id, name}) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id} >
                            <img src={img} className="hover:cursor-pointer hover:hover:bg-white/30 p-1 rounded-full" alt={`icon-${img}`} />
                        </li>
                    ))}

                </ul>

                <time className="hover:bg-white/30 px-1 rounded-xl">{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar
