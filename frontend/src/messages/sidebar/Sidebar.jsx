import { Card, Divider } from "@mui/material"
import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import { cardStyle } from "../../components/styles"

const Sidebar = () => {
    return (
        <Card
            sx={[
              cardStyle,
              {
                marginRight: 2,
                flexDirection: "column",
                height: '100%',
                p: 1
              },
            ]}
          >
            
            <SearchInput/>
            <Divider/>
            <Conversations/>
        </Card>
    )
}

export default Sidebar