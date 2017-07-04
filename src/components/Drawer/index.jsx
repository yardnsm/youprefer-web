import PropTypes from 'prop-types';
import styled from 'styled-components';

const DrawerWrapper = styled.aside`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointerEvents: none;
  boxSizing: border-box;
  contain: strict;
  zIndex: 8;

  @media (max-width: 768px): {
    top: 0;
    zIndex: 9;
  }
`;

const DrawerOverlay = styles.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  willChange: opacity;
  transition: opacity cubic-bezier(0, 0, .2, 1) 350ms;

  opacity: ${props => Number(!!props.toggled)};
`;

const DrawerInner = styled.div`
  background: #ffffff;
  right: 0;
  height: 100%;
  willChange: transform;
  display: flex;
  position: absolute;
  flexDirection: column;
  width: calc(100% - 56px);
  maxWidth: 280px;
  boxSizing: border-box;
  overflow: hidden;
  touchAction: none;
  transition: transform cubic-bezier(0, 0, .2, 1) 350ms;

  boxShadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  
  transform: ${props => props.visible ? 'none' : 'translateX(100%)'};
`;

const Drawer = ({ children, open, handleDrawerClose }) => (
  <DrawerWrapper>
    <DrawerOverlay toggled={open} />

    <DrawerInner visible={open}>
      { children }
    </DrawerInner>
  </DrawerWrapper>
)

// const Drawer = ({ classes, children, open, handleDrawerClose }) => (
//   <aside className={classNames(classes.drawer, {
//     [classes.drawer_open]: open,
//   })}
//   >
//     <div
//       className={classes.drawerOverlay}
//       onClick={handleDrawerClose}
//     />

//     <div className={classes.drawerInner}>
//       {children}
//     </div>
//   </aside>
// );

// Drawer.propTypes = {
//   classes: PropTypes.object.isRequired,
//   children: PropTypes.node.isRequired,
//   open: PropTypes.bool,
//   handleDrawerClose: PropTypes.func.isRequired,
// };

// Drawer.defaultProps = {
//   open: false,
// };

export default injectSheet(styles)(Drawer);
