import { CommonProps } from '../CommonProps'
import { Typography } from '../Typography'
import { Button, Container, LaneContainer, Selector } from './styled'

type PlayerSelectorProps = {
	changeRole: (prop: string) => void;
}

export const PlayerSelector = ({changeRole}: CommonProps<PlayerSelectorProps>) => (
	<Container>
		<LaneContainer>
			<Selector>
				<Button onClick={() => changeRole("TOP")} autoFocus>
					<img src="https://64.media.tumblr.com/865c2b0b53feafd7032ed1ba97f10537/00f052e52b7df56d-fa/s400x600/2c0fd03c88100276ea178185c48090c82eab52a7.png" alt="top-image" />
				</Button>
				<Typography className='lane'>Top</Typography>
			</Selector>
			<Selector>
				<Button onClick={() => changeRole("JUNGLE")}>
					<img src="https://lolshop.net/cdn/shop/files/Rammus-Illustration-Icon-Lol-Shop-6489.jpg?v=1723813750" alt="jungle-image" />
				</Button>
				<Typography className='lane'>Jungle</Typography>
			</Selector>
			<Selector>
				<Button onClick={() => changeRole("MIDDLE")}>
					<img src="https://64.media.tumblr.com/9d794cb8fa4a317be9901b0c05200507/00f052e52b7df56d-67/s400x600/4163b71677639f6f5c1a397f60000d78ab38a325.png" alt="mid-image" />
				</Button>
				<Typography className='lane'>Mid</Typography>
			</Selector>
			<Selector>
				<Button onClick={() => changeRole("BOTTOM")}>
					<img src="https://tiermaker.com/images/template_images/2022/1018049/league-of-legends-champion-illustration-icons-1018049/ashe.png" alt="bottom-image" />
				</Button>
				<Typography className='lane'>Bottom</Typography>
			</Selector>
			<Selector>
				<Button onClick={() => changeRole("UTILITY")}>
					<img src="https://64.media.tumblr.com/80ddd8d13f6c0582d3d8c5baeeb407db/00f052e52b7df56d-7f/s400x600/6d0b3c4fe65817f4285a3284e62b07de562a7068.png" alt="support-image" />
				</Button>
				<Typography className='lane'>Support</Typography>
			</Selector>
		</LaneContainer>
		<Selector>
			<Button onClick={() => changeRole("ANY")}>
				<img src="https://i.pinimg.com/474x/af/99/16/af991658499f54cf8182412216c54e4d.jpg" alt="support-image" />
			</Button>
			<Typography className='lane'>ANY POSITION</Typography>
		</Selector>
	</Container>
)