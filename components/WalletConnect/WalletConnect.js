import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./walletConnectCss.module.css";

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected =
          ready &&
          account &&
          chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: styles.container
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className={styles.connectButton} onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className={styles.chainInfoContainer}>
                  <button
                    className={styles.button}
                    onClick={openChainModal}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        className={styles.chainIconContainer}
                        style={{
                          borderRadius: "50%",
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            className={styles.chainIcon}
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </div>
                    )}
                  </button>

                  <button style={{color: 'white'}} onClick={openAccountModal} type="button">
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
