import { HomeFilled, PlayCircleOutlined, YoutubeOutlined } from "@ant-design/icons";

const SidebarConstant = [
  {
    title: 'Home',
    icon: <HomeFilled />,
    link: '/',
    class: 'active'
  },
  {
    title: 'Shorts',
    icon: <YoutubeOutlined />,
    link: '/shorts',
  },
  {
    title: 'Subscriptions',
    icon: <PlayCircleOutlined />,
    link: '/content',
  }
]

export default SidebarConstant;