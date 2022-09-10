import React from 'react'

function MessagesTab() {
  return (
    <div className="open-tab">
      <div className="conversation-list-wrapper">
        <h3 className="user-status-title">Recent Messages</h3>
        <section className="user-conversation-container">
          <div className="thumbnail-container">
            <img
              src="https://randomuser.me/api/portraits/men/59.jpg"
              alt="thumbnail"
              className="conversation-thumbnail"
            />
            <span className="online-circle"></span>
          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">
              Santiago Mole{" "}
              <img
                src="https://www.trollishly.com/wp-content/uploads/2021/07/Get-Free-Eligibility-Check.png"
                alt="verified"
                className="verified-badge small"
              />
            </h6>
            <span className="conversation-brief">
              I love juice and making ever..
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
            <div className="conversation-notification">
              <span className="notification-number">8</span>
            </div>
          </div>
        </section>

        <section className="user-conversation-container">
          <div className="thumbnail-container">
            <div class="avatars">
              <span class="avatar">
                <img src="https://randomuser.me/api/portraits/men/83.jpg" />
              </span>
              <span class="avatar">
                <img src="https://randomuser.me/api/portraits/women/2.jpg" />
              </span>
              <div class="avatar group-circle">
                <span className="group-count">+9</span>
              </div>
            </div>
          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">Best coders group</h6>
            <span className="conversation-brief">
              I love juice and making ever.. we making two lines to see whats
              up..
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
            <div className="conversation-notification">
              <span className="notification-number">3</span>
            </div>
          </div>
        </section>

        <section className="user-conversation-container">
          <div className="thumbnail-container">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="thumbnail"
              className="conversation-thumbnail"
            />
            <span className="online-circle"></span>
          </div>
          <div className="conversation-info">
            <h6 className="conversation-sender">Jacob Smith</h6>
            <span className="conversation-brief">
              I love juice and making ever.. testing two lines again to see if
              i..
            </span>
          </div>
          <div className="conversation-date">
            <span className="conversation-timestamp">10:22 PM</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MessagesTab