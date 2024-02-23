import { VStack } from '@/styled-system/jsx'
import { Hero } from './(components)/Hero/Hero'
import { Details } from './(components)/Details/Details'
import { Features } from './(components)/Features/Features'
import { SearchSection } from './(components)/SearchSection/SearchSection'

export default function Home () {
    return (
        <VStack justify={'top'} alignItems='center' height='full' width='screen' gap='0px'>
            <Hero/>
            <Details/>
            <Features/>
            <SearchSection/>
        </VStack>
    )
}

