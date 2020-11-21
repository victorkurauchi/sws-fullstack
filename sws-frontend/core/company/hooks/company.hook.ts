import { useState, useEffect } from 'react';
import { Observable, Subscription } from 'rxjs';
import { CompanyModel } from '../company.model';
import { companyService } from '../company.service';
import { companyQuery } from '../company.query';
import { CompanyStateInterface } from '../company.state';

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
  return source$.subscribe(nextFn, console.error);
}

/**
 * Custom Hook to manage a view Model for Companies view components
 */
export function useCompaniesFacade(): [CompanyStateInterface, Function] {
  const [state, setState] = useState({ companies: [], active: null } as CompanyStateInterface);

  const searchCompanies = (value: string) => {
    console.log('received', value);
    companyService.getCompanies(value);
  }

  /**
   * Load all companies and build selectors for `companies` or `active` state changes
   * Manage subscriptions with auto-cleanup
   */
  useEffect(() => {
    companyService.getCompanies();

    const subscriptions: Subscription[] = [
      onEmit<CompanyModel[]>(companyQuery.companies, companies => setState(state => ({ ...state, companies })) ),
      onEmit<CompanyModel>(companyQuery.currentCompany, company => setState(state => ({ ...state, selectedCompany: company })) ),
    ];

    return () => { subscriptions.map(it => it.unsubscribe()) };
  },[]);

  return [state, searchCompanies];
}

export function useCompanyDetailsFacade(): [CompanyStateInterface, Function] {
  const [state, setState] = useState({ companies: [], active: null } as CompanyStateInterface);

  const getCompany = (uuid: string) => companyService.getCompany(uuid);

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<CompanyModel[]>(companyQuery.companies, companies => setState(state => ({ ...state, companies  }))),
      onEmit<CompanyModel>(companyQuery.currentCompany, company => setState(state => ({ ...state, selectedCompany: company }))),
      onEmit<any>(companyQuery.errors, error => setState(state => ({ ...state, error }))),
    ];

    return () => { subscriptions.map(it => it.unsubscribe()) };
  }, []);

  return [state, getCompany];
}
