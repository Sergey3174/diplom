import styled from 'styled-components';
import { Logo, UserBlock } from './components';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../constants/menuItem';

interface SideBarProps {
	className?: string;
}

const SideBarContainer = ({ className }: SideBarProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const location = useLocation();

	const Menu = useMemo(() => menuItems, []);
	useEffect(() => {
		Menu.forEach((item, index) =>
			item.to === location.pathname ? setActiveIndex(index) : null,
		);
	}, [location, Menu]);

	return (
		<div className={className}>
			<Logo />
			<ul>
				{menuItems.map(({ name, to }, index) => (
					<Link to={to} key={index}>
						<li className={activeIndex === index ? 'active' : ''}>{name}</li>
					</Link>
				))}
			</ul>
			<UserBlock />
		</div>
	);
};

export const SideBar = styled(SideBarContainer)`
	width: 220px;
	background-color: white;
	height: 100vh;
	padding: 20px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	position: fixed;

	& ul {
		list-style: none;
		padding: 0;
	}

	& ul li {
		margin-bottom: 15px;
		cursor: pointer;
		padding: 10px;
		border-radius: 4px;
	}

	& ul li:hover {
		background-color: #e0e0e0;
	}

	& ul li.active {
		background-color: #007bff;
		color: white;
		& > a {
			color: white;
		}
	}

	@media (max-width: 1000px) {
		width: 100%;
		height: 50px;
		display: flex;
		padding: 10px;
		justify-content: space-between;
		z-index: 100;
		align-items: center;

		& ul {
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 100%;
			justify-content: space-around;
			background-color: white;
			margin: 0;
			left: 0;
			padding: 3px;
		}

		& ul li {
			margin-bottom: 0;
		}
	}
`;
