import { Link, useLocation } from "@remix-run/react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import {
  ChartBarIcon,
  HomeIcon,
  DocumentChartBarIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <FlowbiteSidebar aria-label="Application sidebar" className="fixed inset-y-0 left-0 z-20 w-64 h-full">
      <FlowbiteSidebar.Logo href="/" img="/logo.png" imgAlt="App logo">
        UX Tools
      </FlowbiteSidebar.Logo>
      
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item
            as={Link}
            to="/"
            icon={HomeIcon}
            active={isActive("/")}
          >
            Dashboard
          </FlowbiteSidebar.Item>
          
          <FlowbiteSidebar.Item
            as={Link}
            to="/comparison"
            icon={ChartBarIcon}
            active={isActive("/comparison")}
          >
            App Comparison
          </FlowbiteSidebar.Item>
          
          <FlowbiteSidebar.Item
            as={Link}
            to="/analysis"
            icon={DocumentChartBarIcon}
            active={isActive("/analysis")}
          >
            Sentiment Analysis
          </FlowbiteSidebar.Item>
          
          <FlowbiteSidebar.Item
            as={Link}
            to="/comments"
            icon={ChatBubbleLeftRightIcon}
            active={isActive("/comments")}
          >
            Comments
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>

        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item
            as={Link}
            to="/settings"
            icon={CogIcon}
            active={isActive("/settings")}
          >
            Settings
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
}
