<div class="updated" style="padding: 0; margin: 0; border: none; background: none;">
  <form id="stocktech_alerts_activate" name="stocktech_alerts_activate" action="<?php echo esc_url( StocktechAlertsSettingsPage::get_page_url() ); ?>" method="POST">
    <div class="stocktech_activate">
      <div class="stocktech_link_container"><a class="button" href="#" onclick="document.stocktech_alerts_activate.submit();" >
        <?php esc_html_e('Activate your Stock Market Overview plugin', 'Stocktech');?>
        </a></div>
      <span class="aa_description">
      <?php _e('Almost done - activate your account', 'Stocktech');?>
      </span> <a href="https://stocktech.org/?page=public-user-api" target="_activateStocktech" >
      <?php esc_html_e(' Get my Api-Key', 'Stocktech');?>
      </a> </div>
  </form>
</div>
