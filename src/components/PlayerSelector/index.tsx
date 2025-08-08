import { TeamProps } from "@/hooks/useHome";
import { CommonProps } from "../CommonProps";
import { Typography } from "../Typography";
import { Button, Container, LaneContainer, Selector } from "./styled";
import Image from "next/image";

type PlayerSelectorProps = {
	changeRole: (prop: keyof TeamProps) => void;
	selectedRole: string;
	team: TeamProps;
};

export const PlayerSelector = ({
	changeRole,
	team,
	selectedRole,
}: CommonProps<PlayerSelectorProps>) => (
	<Container>
		<LaneContainer>
			<Selector>
				<Typography className="summoner-name">
					{team.TOP.summonerName}
				</Typography>
				<Typography className="summoner-name">
					{Math.round(team.TOP.proPlayerPercentage)}%
				</Typography>
				<Button
					onClick={() => changeRole("TOP")}
					className={selectedRole === "TOP" ? "selected" : ""}
				>
					<Image src="/assets/top.jpg" alt="top-image" width={45} height={45} />
				</Button>
				<Typography className="lane">Top</Typography>
			</Selector>
			<Selector>
				<Typography className="summoner-name">
					{team.JUNGLE.summonerName}
				</Typography>
				<Typography className="summoner-name">
					{Math.round(team.JUNGLE.proPlayerPercentage)}%
				</Typography>
				<Button
					onClick={() => changeRole("JUNGLE")}
					className={selectedRole === "JUNGLE" ? "selected" : ""}
				>
					<Image
						src="/assets/jungle.jpg"
						alt="jungle-image"
						width={45}
						height={45}
					/>
				</Button>
				<Typography className="lane">Jungle</Typography>
			</Selector>
			<Selector>
				<Typography className="summoner-name">
					{team.MIDDLE.summonerName}
				</Typography>
				<Typography className="summoner-name">
					{Math.round(team.MIDDLE.proPlayerPercentage)}%
				</Typography>
				<Button
					onClick={() => changeRole("MIDDLE")}
					className={selectedRole === "MIDDLE" ? "selected" : ""}
				>
					<Image src="/assets/mid.jpg" alt="mid-image" width={45} height={45} />
				</Button>
				<Typography className="lane">Mid</Typography>
			</Selector>
			<Selector>
				<Typography className="summoner-name">
					{team.BOTTOM.summonerName}
				</Typography>
				<Typography className="summoner-name">
					{Math.round(team.BOTTOM.proPlayerPercentage)}%
				</Typography>
				<Button
					onClick={() => changeRole("BOTTOM")}
					className={selectedRole === "BOTTOM" ? "selected" : ""}
				>
					<Image
						src="/assets/adc.jpg"
						alt="bottom-image"
						width={45}
						height={45}
					/>
				</Button>
				<Typography className="lane">Bottom</Typography>
			</Selector>
			<Selector>
				<Typography className="summoner-name">
					{team.UTILITY.summonerName}
				</Typography>
				<Typography className="summoner-name">
					{Math.round(team.UTILITY.proPlayerPercentage)}%
				</Typography>
				<Button
					onClick={() => changeRole("UTILITY")}
					className={selectedRole === "UTILITY" ? "selected" : ""}
				>
					<Image
						src="/assets/support.jpg"
						alt="support-image"
						width={45}
						height={45}
					/>
				</Button>
				<Typography className="lane">Support</Typography>
			</Selector>
		</LaneContainer>
	</Container>
);
