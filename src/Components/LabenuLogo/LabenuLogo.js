import { useState } from "react"
import { StyledLabenuLogo, StyledQuarter } from "./StyledLabenuLogo"

export const LabenuLogo = ({size, time}) => {

    const [isActive, SetIsActive] = useState(false)

    setInterval(()=>SetIsActive(!isActive), time)

    return(
        <StyledLabenuLogo isActive={isActive}>
        <div>
        <StyledQuarter size={size} color="#FE7E02" leftRadius="100%" isActive={isActive}/>
        <StyledQuarter size={size} color="#F9B24E" rightRadius="100%" isActive={isActive}/>
        </div>
        <div>
        <StyledQuarter size={size} color="#45525B" leftRadius="100%" isActive={isActive}/>
        <StyledQuarter size={size} color="#A8BBC6" rightRadius="100%" isActive={isActive}/>
        </div>
        </StyledLabenuLogo>
    )
}