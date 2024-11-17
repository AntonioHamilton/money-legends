import { TeamProps } from "@/pages/home";
import { CommonProps } from "../CommonProps";
import { Typography } from "../Typography";
import { Button, Container, LaneContainer, Selector } from "./styled";

type PlayerSelectorProps = {
	changeRole: (prop: keyof TeamProps) => void;
	selectedRole: string;
};

export const PlayerSelector = ({
	changeRole,
	selectedRole,
}: CommonProps<PlayerSelectorProps>) => (
	<Container>
		<LaneContainer>
			<Selector>
				<Button
					onClick={() => changeRole("TOP")}
					className={selectedRole === "TOP" ? "selected" : ""}
				>
					<img
						src="https://ih1.redbubble.net/image.2355783081.2767/st,small,507x507-pad,600x600,f8f8f8.jpg"
						alt="top-image"
					/>
				</Button>
				<Typography className="lane">Top</Typography>
			</Selector>
			<Selector>
				<Button
					onClick={() => changeRole("JUNGLE")}
					className={selectedRole === "JUNGLE" ? "selected" : ""}
				>
					<img
						src="https://ih1.redbubble.net/image.3271051226.7343/st,medium,507x507-pad,600x600,f8f8f8.u2.jpg"
						alt="jungle-image"
					/>
				</Button>
				<Typography className="lane">Jungle</Typography>
			</Selector>
			<Selector>
				<Button
					onClick={() => changeRole("MIDDLE")}
					className={selectedRole === "MIDDLE" ? "selected" : ""}
				>
					<img
						src="https://ih1.redbubble.net/image.2354245969.4601/tst,small,507x507-pad,600x600,f8f8f8.jpg"
						alt="mid-image"
					/>
				</Button>
				<Typography className="lane">Mid</Typography>
			</Selector>
			<Selector>
				<Button
					onClick={() => changeRole("BOTTOM")}
					className={selectedRole === "BOTTOM" ? "selected" : ""}
				>
					<img
						src="https://ih1.redbubble.net/image.2354182162.2636/pp,504x498-pad,600x600,f8f8f8.jpg"
						alt="bottom-image"
					/>
				</Button>
				<Typography className="lane">Bottom</Typography>
			</Selector>
			<Selector>
				<Button
					onClick={() => changeRole("UTILITY")}
					className={selectedRole === "UTILITY" ? "selected" : ""}
				>
					<img
						src="https://ih1.redbubble.net/image.2354270772.5334/st,small,507x507-pad,600x600,f8f8f8.jpg"
						alt="support-image"
					/>
				</Button>
				<Typography className="lane">Support</Typography>
			</Selector>
		</LaneContainer>
		<Selector>
			<Button
				onClick={() => changeRole("ANY")}
				className={selectedRole === "ANY" ? "selected" : ""}
			>
				<img
					src="https://i.pinimg.com/474x/af/99/16/af991658499f54cf8182412216c54e4d.jpg"
					alt="support-image"
				/>
			</Button>
			<Typography className="lane">ANY POSITION</Typography>
		</Selector>
	</Container>
);
