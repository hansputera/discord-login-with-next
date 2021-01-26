import { Flex, Heading, Link as ChakraLink } from '@chakra-ui/react'

export const Hero = ({ title, isLink, url }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading fontSize="10vw">
		{ isLink ? <ChakraLink variant="outline" href={url}>{title}</ChakraLink> : title}
	</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Discord Login',
  isLink: false,
  url: false
}