import { useStore } from "laco-react";
import { Subscribe } from "laco-react";

import store from "~/store.js";
import FullscreenEnterIcon from "~/public/static/icons/FullscreenEnter.svg";
import FullscreenExitIcon from "~/public/static/icons/FullscreenExit.svg";
import DFDSLogo from "~/public/static/icons/DFDSLogo.svg";
import NextIcon from "~/public/static/icons/Next.svg";
import SettingsIcon from "~/public/static/icons/Settings.svg";
import UserIcon from "~/public/static/icons/User.svg";
import SearchIcon from "~/public/static/icons/Search.svg";

const fullscreenWasToggled = () =>
  store.set(state => ({ isFullscreen: !state.isFullscreen }));

const MainHeader = ({ lastUpdated }) => {
  const { isFullscreen } = useStore(store);

  const [leftSidebarToggle, setLeftSidebarToggle] = React.useState(false);

  let isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isFullscreen && !document.fullscreenElement) {
      document.body.requestFullscreen().catch(err => {
        console.error(err);
      });
    } else if (!isFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error(err);
      });
    }
  }, [isFullscreen]);

  return (
    <>
      <Subscribe to={[store]}>
        {storeState => (
          <header className="main-header">
            <div className="left-sidebar">
              <div className="sidebar-content">TODO: find ship and terminals</div>
              <button
                onClick={() => {
                  setLeftSidebarToggle(s => !s);
                }}
                className="button-sidebar"
                aria-label="sidebar"
              >
                <NextIcon />
              </button>
            </div>

            <div className="button-group">
              {storeState.isFullscreenSupported && (
                <button
                  className="button toggle-full-screen"
                  onClick={fullscreenWasToggled}
                  title="toggle full screen"
                >
                  {storeState.isFullscreen ? (
                    <FullscreenExitIcon className="fullscreen-exit-icon" />
                  ) : (
                    <FullscreenEnterIcon className="fullscreen-exit-icon" />
                  )}
                </button>
              )}
              {/* 
              <button
                className="button button-search"
                onClick={() => alert("TODO")}
                title="search"
              >
                <SearchIcon className="search-icon" />
              </button> */}

              {/* <button
                className="button button-user"
                onClick={() => alert("TODO")}
                title="user"
              >
                <UserIcon className="user-icon" />
              </button> */}
              <button
                title="settings"
                className="button button-settings"
                onClick={() => alert("TODO")}
              >
                <SettingsIcon className="settings-icon" />
              </button>
            </div>
          </header>
        )}
      </Subscribe>

      <style jsx>{`
        .main-header {
          height: 50px;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          _max-width: 1300px;
          font-size: 14px;
          color: #002b45;
          text-align: left;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-wrap: wrap;
          pointer-events: none;
        }

        .button-group {
          pointer-events: all;
          height: inherit;
          display: flex;
        }
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          margin: 5px;
          color: $color-groupBlue;
          cursor: pointer;
          font-size: 20px;
          border-radius: 50%;
          background: rgba(white, 0.5);
          @supports (backdrop-filter: blur(10px)) {
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: saturate(180%) blur(4px);
          }
          > :global(svg) {
            _outline: 1px solid red;
          }
        }
        .toggle-full-screen {
          font-size: 30px;
          border: none;
          fill: $color-groupBlue;
        }
        .left-sidebar {
          pointer-events: all;
          position: relative;
          height: 300px;
          width: 200px;
          position: absolute;
          top: 5px;
          left: 0;
          background: rgba(white, 0.5);
          transition: transform 300ms;
        }
        .button-sidebar {
          position: absolute;
          right: -20px;
          top: 0;
          padding: 0;
          color: $color-groupBlue;
          display: flex;
          justify: center;
          align-items: center;
          height: 50px;
          font-size: 20px;
          background: rgba(white, 0.5);
          @supports (backdrop-filter: blur(10px)) {
            background-color: rgba(255, 255, 255, 0.5);
            backdrop-filter: saturate(180%) blur(4px);
          }
        }
        .sidebar-content {
          position: absolute;
          top: 0;
          left: 0;
          padding: 10px;
        }
        :global(.fullscreen-exit-icon) {
          display: block;
        }
        :global(.fullscreen-enter-icon) {
          display: block;
        }
      `}</style>
      <style jsx>{`
        .logo {
          _opacity: ${isFullscreen ? 0.7 : ""};
        }
        .toggle-full-screen {
          _opacity: ${isFullscreen ? 0.7 : ""};
        }
        .left-sidebar {
          transform: ${leftSidebarToggle
            ? "translateX(0)"
            : "translateX(-100%)"};
        }
        .button-sidebar {
          transform: ${leftSidebarToggle ? "rotate(.5turn)" : "rotate(0)"};
        }
      `}</style>
    </>
  );
};

export default MainHeader;
